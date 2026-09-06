<script lang="ts">
	import { page } from '$app/state';
	import { absoluteUrl, socialImage } from './seo';

	let {
		title,
		description,
		type = 'website'
	}: {
		title: string;
		description: string;
		type?: 'website' | 'article';
	} = $props();
	const image = $derived(socialImage(page.url.pathname, title));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={absoluteUrl(page.url.pathname)} />
	<meta property="og:site_name" content="Max Zhang" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={image.url} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={image.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image.url} />
	<meta name="twitter:image:alt" content={image.alt} />
</svelte:head>
