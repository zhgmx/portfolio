export const siteUrl = 'https://zhgmx.com';

export const person = {
	'@type': 'Person',
	name: 'Max Zhang',
	url: siteUrl,
	jobTitle: 'Computer Science Student',
	affiliation: {
		'@type': 'CollegeOrUniversity',
		name: 'Stony Brook University'
	},
	sameAs: ['https://github.com/zhgmx', 'https://www.linkedin.com/in/zhgmx']
};

export function absoluteUrl(path: string): string {
	return new URL(path, siteUrl).toString();
}

export function serializeJsonLd(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function jsonLdScript(value: unknown): string {
	return `<script type="application/ld+json">${serializeJsonLd(value)}</script>`;
}
