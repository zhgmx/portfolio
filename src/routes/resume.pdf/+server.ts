import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ platform }) => {
	if (!platform) error(503, 'Resume storage is unavailable.');
	const object = await platform.env.RESUME.get('resume.pdf');
	if (!object) {
		return new Response('Resume not found.', {
			status: 404,
			headers: { 'Cache-Control': 'no-store' }
		});
	}

	const headers = new Headers({
		'Content-Type': 'application/pdf',
		'Content-Length': String(object.size),
		'Cache-Control': 'no-cache',
		ETag: object.httpEtag,
		'Last-Modified': object.uploaded.toUTCString(),
		'X-Content-Type-Options': 'nosniff'
	});
	if (object.httpMetadata?.contentDisposition) {
		headers.set('Content-Disposition', object.httpMetadata.contentDisposition);
	}
	return new Response(object.body, { headers });
};
