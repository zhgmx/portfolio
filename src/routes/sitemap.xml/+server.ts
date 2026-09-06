import { siteUrl } from '$lib/seo';
import { getProjects, getWriting } from '$lib/content';
import type { RequestHandler } from './$types';

export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export const GET: RequestHandler = () => {
	const paths = [
		'/',
		...getProjects().map((entry) => `/projects/${encodeURIComponent(entry.slug)}`),
		...getWriting().map((entry) => `/writing/${encodeURIComponent(entry.slug)}`)
	];

	const urls = paths
		.map((path) => `\t<url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`)
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
