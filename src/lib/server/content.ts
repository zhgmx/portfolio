import { Marked } from 'marked';
import { escapeAttribute, previewHtml, previewParts } from '../links';
import type { Entry } from '../content';
import { invalidContent, parseContent } from './content-parser';

const projectFiles = import.meta.glob('../../content/projects/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const writingFiles = import.meta.glob('../../content/writing/*.md', {
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

function load(files: Record<string, string>): Entry[] {
	return Object.keys(files)
		.map((key) => {
			const slug = key.split('/').pop()?.replace(/\.md$/, '');
			if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
				invalidContent(key, 'filename must use a lowercase kebab-case slug');
			}
			return { ...parseContent(files[key], key), slug };
		})
		.filter((entry) => !entry.draft);
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
