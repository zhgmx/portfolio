<script lang="ts">
	import Entry from '$lib/Entry.svelte';
	import { absoluteUrl, jsonLdScript, person, siteUrl } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data } = $props();

	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: data.entry.title,
		description: data.entry.description,
		url: `${siteUrl}/projects/${data.entry.slug}`,
		author: person,
		...(data.entry.source ? { codeRepository: data.entry.source } : {}),
		...(data.entry.url ? { sameAs: data.entry.url } : {}),
		...(data.entry.image ? { image: absoluteUrl(data.entry.image) } : {}),
		...(data.entry.tech?.length ? { programmingLanguage: data.entry.tech } : {})
	});
</script>

<svelte:head>
	<title>{data.entry.title} | Max Zhang</title>
	<meta name="description" content={data.entry.description} />
	{@html jsonLdScript(structuredData)}
</svelte:head>

<Entry entry={data.entry} />
