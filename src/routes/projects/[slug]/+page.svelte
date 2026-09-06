<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import Entry from '$lib/Entry.svelte';
	import { absoluteUrl, jsonLdScript, person, siteUrl } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: data.entry.title,
		description: data.entry.description,
		url: `${siteUrl}/projects/${data.entry.slug}`,
		author: person,
		inLanguage: 'en-US',
		mainEntityOfPage: `${siteUrl}/projects/${data.entry.slug}`,
		...(data.entry.source ? { codeRepository: data.entry.source } : {}),
		...(data.entry.url ? { sameAs: data.entry.url } : {}),
		...(data.entry.image ? { image: absoluteUrl(data.entry.image) } : {}),
		...(data.entry.tech?.length ? { programmingLanguage: data.entry.tech } : {})
	});
</script>

<Seo title={`${data.entry.title} | Max Zhang`} description={data.entry.description} />

<svelte:head>
	{@html jsonLdScript(structuredData)}
</svelte:head>

<Entry entry={data.entry} />
