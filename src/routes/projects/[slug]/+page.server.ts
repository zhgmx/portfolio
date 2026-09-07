import { getProject, getProjects, markdownHtml } from '$lib/server/content';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = getProjects().length > 0;

export const entries: EntryGenerator = () => getProjects().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const entry = getProject(params.slug);
	if (!entry) error(404, 'Not found');
	const { body, draft: _draft, ...metadata } = entry;
	return { entry: { ...metadata, html: markdownHtml(body) } };
};
