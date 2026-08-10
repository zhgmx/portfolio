<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

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
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
