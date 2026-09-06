<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate, onNavigate, replaceState } from '$app/navigation';
	import { bind, setEnabled, setVolume } from 'cuelume';
	import { onMount } from 'svelte';
	import { readSoundEnabled } from '$lib/sound';
	import Footer from '$lib/Footer.svelte';
	import './layout.css';

	let { children } = $props();
	const canonical = $derived(`https://zhgmx.com${page.url.pathname}`);

	onMount(() => {
		setEnabled(readSoundEnabled());
		setVolume(0.55);
		bind();
	});

	afterNavigate(({ from, to, type }) => {
		if (type === 'enter' || from?.url.pathname !== '/') return;
		if (to?.route.id !== '/projects/[slug]' && to?.route.id !== '/writing/[slug]') return;

		replaceState('', { ...page.state, returnToHome: true });
	});

	onNavigate((navigation) => {
		if (
			document.startViewTransition &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return new Promise((resolve) => {
				document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
				});
			});
		}
	});
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
	<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
<Footer />
