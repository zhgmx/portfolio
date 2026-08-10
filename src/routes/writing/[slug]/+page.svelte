<script lang="ts">
	import Entry from '$lib/Entry.svelte';
	import type { PageProps } from './$types';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.entry.title} | Max Zhang</title>
	<meta name="description" content={data.entry.description} />
</svelte:head>

<Entry entry={data.entry} />
