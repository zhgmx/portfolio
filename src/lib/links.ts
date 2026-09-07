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
			external: url.protocol === 'https:' || url.protocol === 'http:'
		};
	} catch {
		return { host: href, path: '', external: false };
	}
}

export function escapeAttribute(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

export function previewHtml(href: string): string {
	const { host, path, external } = previewParts(href);
	if (!external) return '';
	const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
	return `<span class="tip-row"><img class="tip-favicon" width="18" height="18" data-src="${escapeAttribute(favicon)}" alt="" /><span class="tip-host">${escapeAttribute(host)}</span><svg class="tip-arrow" viewBox="0 0 16 16"><path d="M4 12 12 4M6 4h6v6" /></svg></span>${path ? `<span class="tip-path">${escapeAttribute(path)}</span>` : ''}`;
}
