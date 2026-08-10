import { getProject, markdownHtml } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const entry = getProject(params.slug);
	if (!entry) error(404, 'Not found');
	return { entry: { ...entry, html: markdownHtml(entry.body) } };
};
