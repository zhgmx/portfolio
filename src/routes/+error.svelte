<script lang="ts">
	import { page } from '$app/state';
	import { play } from 'cuelume';
	import IconArrowLeftRegular from 'phosphor-icons-svelte/IconArrowLeftRegular.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (page.status !== 404) return;

		const playError = () => play('error', { volume: 0.24 });

		if (navigator.userActivation?.hasBeenActive) {
			playError();
			return;
		}

		const handleInteraction = () => {
			playError();
			window.removeEventListener('pointerdown', handleInteraction);
			window.removeEventListener('keydown', handleInteraction);
		};

		window.addEventListener('pointerdown', handleInteraction, { once: true });
		window.addEventListener('keydown', handleInteraction, { once: true });

		return () => {
			window.removeEventListener('pointerdown', handleInteraction);
			window.removeEventListener('keydown', handleInteraction);
		};
	});
</script>

<svelte:head>
	<title>{page.status} | Max Zhang</title>
	<meta name="description" content="The requested page could not be found." />
</svelte:head>

<main class="shell">
	{#if page.status === 404}
		<h1>Page not found.</h1>
		<p class="message">The page you're looking for doesn't exist or may have moved.</p>
	{:else}
		<h1>Something went wrong.</h1>
		<p class="message">Try again, or head back to the homepage.</p>
	{/if}
	<a class="home-link" href="/" data-cuelume-press="press" data-cuelume-release="release">
		<IconArrowLeftRegular /> Home
	</a>
</main>

<style>
	.shell {
		max-width: 40rem;
		margin: 0 auto;
		padding: 3.5rem 1.5rem 4rem;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-weight: 600;
		line-height: 1.25;
	}

	.message {
		max-width: 28rem;
		margin: 0 0 1.5rem;
		color: var(--muted);
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--muted);
		font: inherit;
		transition: color 150ms var(--ease-out);
	}

	.home-link :global(svg) {
		width: 0.9em;
		height: 0.9em;
	}

	@media (prefers-reduced-motion: reduce) {
		.home-link {
			transition: none;
		}
	}

	@media (hover: hover) and (pointer: fine) {
		.home-link:hover {
			color: var(--ink);
		}
	}
</style>
