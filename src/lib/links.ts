export interface Preview {
	host: string;
	path: string;
	external: boolean;
}

export function previewParts(href: string): Preview {
	if (href.startsWith('mailto:')) return { host: href.slice(7), path: '', external: false };
	if (href.startsWith('/')) return { host: '', path: href, external: false };
	try {
		const url = new URL(href);
		return {
			host: url.hostname.replace(/^www\./, ''),
			path: url.pathname === '/' ? '' : url.pathname,
			external: true
		};
	} catch {
		return { host: href, path: '', external: false };
	}
}
