import { homeTitle } from '$lib/seo';
import { error } from '@sveltejs/kit';
import { getProjects, getWriting } from '$lib/server/content';
import { renderSocialCard } from '$lib/server/social-card';
import type { EntryGenerator, RequestHandler } from './$types';

export const prerender = true;

const cards = [
	{ path: 'home', title: homeTitle, page: '/' },
	...getProjects().map((entry) => ({
		path: `projects/${entry.slug}`,
		title: entry.title,
		page: `/projects/${entry.slug}`
	})),
	...getWriting().map((entry) => ({
		path: `writing/${entry.slug}`,
		title: entry.title,
		page: `/writing/${entry.slug}`
	}))
];

export const entries: EntryGenerator = () => cards.map(({ path }) => ({ path }));

export const GET: RequestHandler = async ({ params }) => {
	const card = cards.find((card) => card.path === params.path);
	if (!card) error(404, 'Social card not found');
	const png = await renderSocialCard(card.title, card.page);
	return new Response(png, {
		headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' }
	});
};
