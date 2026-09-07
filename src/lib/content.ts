import { Marked } from 'marked';
import { escapeAttribute, previewHtml, previewParts } from './links';
import { techLinks } from './tech';

export interface Entry {
	slug: string;
	title: string;
	date?: string;
	year?: string;
	url?: string;
	source?: string;
	image?: string;
	order?: number;
	tech?: string[];
	description: string;
	body: string;
	html?: string;
}

const projectFiles = import.meta.glob('../content/projects/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const writingFiles = import.meta.glob('../content/writing/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const markdown = new Marked({
	renderer: {
		link({ href, title, tokens }) {
			return linkHtml(href, this.parser.parseInline(tokens), title ?? undefined);
		}
	}
});

const metadataKeys = new Set([
	'title',
	'date',
	'year',
	'url',
	'source',
	'image',
	'order',
	'tech',
	'summary'
]);

function invalidContent(source: string, message: string): never {
	throw new Error(`Invalid content in ${source}: ${message}`);
}

function validDate(value: string): boolean {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = new Date(`${value}T00:00:00Z`);
	return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function parse(raw: string, source: string): Omit<Entry, 'slug'> {
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

		meta[key] = line
			.slice(sep + 1)
			.trim()
			.replace(/^["']|["']$/g, '');
	}

	if (!meta.title) invalidContent(source, 'title is required');
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
	const paragraphs = body
		.split(/\n\s*\n/)
		.map((p) => p.replace(/\s*\n\s*/g, ' '))
		.filter(Boolean);
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
		description: meta.summary ?? paragraphs[0] ?? '',
		body
	};
}

function load(files: Record<string, string>): Entry[] {
	return Object.keys(files).map((key) => {
		const slug = key.split('/').pop()?.replace(/\.md$/, '');
		if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
			invalidContent(key, 'filename must use a lowercase kebab-case slug');
		}
		return { ...parse(files[key], key), slug };
	});
}

const projects = load(projectFiles).sort(
	(a, b) => (a.order ?? 999) - (b.order ?? 999) || a.slug.localeCompare(b.slug)
);

const writing = load(writingFiles).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

export function getProjects(): Entry[] {
	return projects;
}

export function getWriting(): Entry[] {
	return writing;
}

export function getProject(slug: string): Entry | undefined {
	return projects.find((entry) => entry.slug === slug);
}

export function getPost(slug: string): Entry | undefined {
	return writing.find((entry) => entry.slug === slug);
}

export function linkHtml(href: string, label: string, title?: string): string {
	const { external } = previewParts(href);
	const target = external ? ' target="_blank" rel="noreferrer"' : '';
	const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : '';
	const tip = external ? `<span class="tip" aria-hidden="true">${previewHtml(href)}</span>` : '';
	return `<a class="link" href="${escapeAttribute(href)}"${titleAttribute}${target}>${label}${tip}</a>`;
}

export function markdownHtml(body: string): string {
	return markdown.parse(body) as string;
}
