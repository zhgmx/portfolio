<script lang="ts">
	import Entry from '$lib/Entry.svelte';
	import { jsonLdScript, person, siteUrl } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data } = $props();

	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.entry.title,
		description: data.entry.description,
		url: `${siteUrl}/writing/${data.entry.slug}`,
		author: person,
		...(data.entry.date ? { datePublished: data.entry.date } : {})
	});
</script>

<svelte:head>
	<title>{data.entry.title} | Max Zhang</title>
	<meta name="description" content={data.entry.description} />
	{@html jsonLdScript(structuredData)}
</svelte:head>

<Entry entry={data.entry} />
