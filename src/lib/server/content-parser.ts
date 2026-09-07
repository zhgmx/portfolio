import type { Entry } from '../content';
import { techLinks } from '../tech';

const metadataKeys = new Set([
	'title',
	'date',
	'year',
	'url',
	'source',
	'image',
	'order',
	'tech',
	'summary',
	'draft'
]);

export function invalidContent(source: string, message: string): never {
	throw new Error(`Invalid content in ${source}: ${message}`);
}

function validDate(value: string): boolean {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = new Date(`${value}T00:00:00Z`);
	return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function parseContent(raw: string, source: string): Omit<Entry, 'slug'> {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	if (!match) invalidContent(source, 'missing or malformed front matter');

	const meta: Record<string, string> = {};
	for (const line of match[1].split('\n')) {
		if (!line.trim()) continue;
		const sep = line.indexOf(':');
		if (sep < 1) invalidContent(source, `malformed metadata line: ${line}`);

		const key = line.slice(0, sep).trim();
		if (!metadataKeys.has(key)) invalidContent(source, `unknown metadata field "${key}"`);
		if (key in meta) invalidContent(source, `duplicate metadata field "${key}"`);

		let value = line.slice(sep + 1).trim();
		if (value.startsWith('"') || value.startsWith("'")) {
			if (value.length < 2 || !value.endsWith(value[0])) {
				invalidContent(source, `unmatched quote in "${key}"`);
			}
			value = value.slice(1, -1);
		}
		if (!value.trim()) invalidContent(source, `metadata field "${key}" must not be empty`);
		meta[key] = value;
	}

	if (!meta.title) invalidContent(source, 'title is required');
	if (meta.draft !== undefined && meta.draft !== 'true' && meta.draft !== 'false') {
		invalidContent(source, 'draft must be true or false');
	}
	for (const key of ['url', 'source']) {
		if (!meta[key]) continue;
		let url: URL;
		try {
			url = new URL(meta[key]);
		} catch {
			invalidContent(source, `${key} must be an absolute HTTP(S) URL`);
		}
		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			invalidContent(source, `${key} must be an absolute HTTP(S) URL`);
		}
	}
	if (meta.date && !validDate(meta.date)) {
		invalidContent(source, `date must be a valid YYYY-MM-DD value, received "${meta.date}"`);
	}
	if (meta.year && !/^\d{4}$/.test(meta.year)) {
		invalidContent(source, `year must contain four digits, received "${meta.year}"`);
	}

	const order = meta.order === undefined ? undefined : Number(meta.order);
	if (order !== undefined && !Number.isFinite(order)) {
		invalidContent(source, `order must be numeric, received "${meta.order}"`);
	}

	const tech = meta.tech
		? meta.tech
				.split(',')
				.map((value) => value.trim())
				.filter(Boolean)
		: undefined;
	for (const name of tech ?? []) {
		if (!techLinks[name]) invalidContent(source, `unknown tech value "${name}"`);
	}

	const body = match[2].trim();
	if (!meta.summary && meta.draft !== 'true') {
		invalidContent(source, 'published entries require a plain-text summary');
	}
	const firstImage = /!\[[^\]]*\]\(([^)]+)\)/.exec(body);
	return {
		title: meta.title,
		date: meta.date,
		year: meta.year,
		url: meta.url,
		source: meta.source,
		image: meta.image ?? (firstImage ? firstImage[1].trim().replace(/\s+["'].*$/, '') : undefined),
		order,
		tech,
		description: meta.summary ?? '',
		draft: meta.draft === 'true',
		body
	};
}
