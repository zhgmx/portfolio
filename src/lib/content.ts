import { Marked } from 'marked';
import { previewParts } from './links';

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

function parse(raw: string): Omit<Entry, 'slug'> {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	const meta: Record<string, string> = {};
	for (const line of (match?.[1] ?? '').split('\n')) {
		const sep = line.indexOf(':');
		if (sep < 1) continue;
		meta[line.slice(0, sep).trim()] = line
			.slice(sep + 1)
			.trim()
			.replace(/^["']|["']$/g, '');
	}
	const body = (match?.[2] ?? '').trim();
	const paragraphs = body
		.split(/\n\s*\n/)
		.map((p) => p.replace(/\s*\n\s*/g, ' '))
		.filter(Boolean);
	const firstImage = /!\[[^\]]*\]\(([^)]+)\)/.exec(body);
	return {
		title: meta.title ?? 'Untitled',
		date: meta.date,
		year: meta.year,
		url: meta.url,
		source: meta.source,
		image: meta.image ?? (firstImage ? firstImage[1].trim().replace(/\s+["'].*$/, '') : undefined),
		order: meta.order ? Number(meta.order) : undefined,
		tech: meta.tech
			? meta.tech
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean)
			: undefined,
		description: meta.summary ?? paragraphs[0] ?? '',
		body
	};
}

function load(files: Record<string, string>): Entry[] {
	return Object.keys(files).map((key) => {
		const slug = key.split('/').pop()?.replace(/\.md$/, '') ?? 'untitled';
		return { ...parse(files[key]), slug };
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

function escapeAttribute(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

export function linkHtml(href: string, label: string, title?: string): string {
	const { host, path, external } = previewParts(href);
	const target = external ? ' target="_blank" rel="noreferrer"' : '';
	const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : '';
	const tip = external
		? `<span class="tip" aria-hidden="true"><span class="tip-row"><img class="tip-favicon" src="https://www.google.com/s2/favicons?domain=${host}&sz=64" alt="" onerror="this.style.display='none'" /><span class="tip-host">${host}</span><svg class="tip-arrow" viewBox="0 0 16 16"><path d="M4 12 12 4M6 4h6v6" /></svg></span>${path ? `<span class="tip-path">${path}</span>` : ''}</span>`
		: '';
	return `<a class="link" href="${escapeAttribute(href)}"${titleAttribute}${target}>${label}${tip}</a>`;
}

export function markdownHtml(body: string): string {
	return markdown.parse(body) as string;
}
