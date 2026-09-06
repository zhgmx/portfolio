<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import Entry from '$lib/Entry.svelte';
	import { absoluteUrl, jsonLdScript, person, siteUrl, socialImage } from '$lib/seo';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const structuredData = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		image: data.entry.image
			? absoluteUrl(data.entry.image)
			: socialImage(`/writing/${data.entry.slug}`, data.entry.title).url,
		headline: data.entry.title,
		description: data.entry.description,
		url: `${siteUrl}/writing/${data.entry.slug}`,
		author: person,
		inLanguage: 'en-US',
		mainEntityOfPage: `${siteUrl}/writing/${data.entry.slug}`,
		...(data.entry.date ? { datePublished: data.entry.date } : {})
	});
</script>

<Seo
	title={`${data.entry.title} | Max Zhang`}
	description={data.entry.description}
	type="article"
/>

<svelte:head>
	{@html jsonLdScript(structuredData)}
</svelte:head>

<Entry entry={data.entry} />
