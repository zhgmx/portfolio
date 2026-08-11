<script lang="ts">
	import { page } from '$app/state';
	import { play } from 'cuelume';
	import IconArrowLeftRegular from 'phosphor-icons-svelte/IconArrowLeftRegular.svelte';
	import { onMount } from 'svelte';

	interface ErrorCopy {
		heading: string;
		message: string;
	}

	const defaultError: ErrorCopy = {
		heading: 'Hmm… something went wrong.',
		message: 'Try again, or head back to the homepage.'
	};

	const errors: Record<number, ErrorCopy> = {
		400: {
			heading: 'Invalid request.',
			message: 'The server couldn’t understand your request. Check the URL and try again.'
		},
		403: {
			heading: 'Access denied.',
			message: 'You don’t have permission to view this page.'
		},
		404: {
			heading: 'Lost?',
			message: 'The page you’re looking for doesn’t exist or may have moved.'
		},
		429: {
			heading: 'Slow down!',
			message:
				'You’ve made a few too many requests recently. Please wait a moment before trying again.'
		},
		500: defaultError,
		502: {
			heading: 'Something got lost along the way.',
			message:
				'The server tried to contact another service but received an invalid response. Try again in a moment.'
		},
		503: {
			heading: 'Things are a little busy.',
			message: 'The server can’t handle your request at the moment. Try again later.'
		}
	};

	const copy = $derived(errors[page.status] ?? defaultError);

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
	<meta name="description" content={copy.message} />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="shell">
	<h1>{copy.heading}</h1>
	<p class="message">{copy.message}</p>
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
