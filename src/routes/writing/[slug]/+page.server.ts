import { getPost, getWriting, markdownHtml } from '$lib/server/content';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

// An empty collection has no pages for SvelteKit to prerender; requests still return 404.
export const prerender = getWriting().length > 0;

export const entries: EntryGenerator = () => getWriting().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	const entry = getPost(params.slug);
	if (!entry) error(404, 'Not found');
	const { body, draft: _draft, ...metadata } = entry;
	return { entry: { ...metadata, html: markdownHtml(body) } };
};
