<script lang="ts">
	import IconArrowLeftRegular from 'phosphor-icons-svelte/IconArrowLeftRegular.svelte';
	import IconGithubLogoRegular from 'phosphor-icons-svelte/IconGithubLogoRegular.svelte';
	import IconGlobeSimpleRegular from 'phosphor-icons-svelte/IconGlobeSimpleRegular.svelte';
	import InlineLink from './InlineLink.svelte';
	import { techLinks } from './tech';
	import type { Entry } from './content';

	let { entry }: EntryProps = $props();

	interface EntryProps {
		entry: Entry;
	}

	const meta = $derived(
		entry.date
			? new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: (entry.year ?? '')
	);

	function onBack() {
		if (sessionStorage.getItem('portfolio-visited')) {
			history.back();
		} else {
			location.href = '/';
		}
	}
</script>

<main class="shell">
	<header class="head">
		<button class="back" type="button" onclick={onBack}><IconArrowLeftRegular /> Back</button>
		<h1>{entry.title}</h1>
		<div class="meta-row">
			{#if entry.tech?.length}
				<div class="meta-pills">
					{#each entry.tech as name}
						{@const tech = techLinks[name]}
						<InlineLink
							class="stack-item"
							href={tech.href}
							icon={`/skills/${tech.icon}.svg`}
							label={name}
						/>
					{/each}
				</div>
			{:else if meta}
				<span class="meta">{meta}</span>
			{/if}
			<div class="meta-links">
				{#if entry.url}
					<InlineLink class="meta-link" href={entry.url} ariaLabel="Open site">
						<IconGlobeSimpleRegular />
					</InlineLink>
				{/if}
				{#if entry.source}
					<InlineLink class="meta-link" href={entry.source} ariaLabel="Source code">
						<IconGithubLogoRegular />
					</InlineLink>
				{/if}
			</div>
		</div>
	</header>

	<div class="prose">{@html entry.html ?? ''}</div>
</main>

<style>
	.shell {
		max-width: 40rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.head {
		padding: 3.5rem 0 2.5rem;
		border-bottom: 1px solid var(--hairline);
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0;
		border: 0;
		background: none;
		color: var(--muted);
		font: inherit;
		cursor: pointer;
		transition: color 150ms var(--ease-out);
	}

	.back:hover {
		color: var(--ink);
	}

	.back :global(svg) {
		width: 0.9em;
		height: 0.9em;
	}

	h1 {
		font-weight: 600;
		line-height: 1.25;
		margin: 1.5rem 0 0.5rem;
	}

	.meta-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem 1rem;
		color: var(--muted);
	}

	.meta-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.meta-links {
		display: flex;
		align-items: center;
		gap: 0.125rem;
	}

	:global(.link.meta-link) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		text-decoration: none;
		transition:
			transform 120ms var(--ease-out),
			color 150ms var(--ease-out),
			background-color 150ms var(--ease-out);
	}

	:global(.link.meta-link:hover) {
		color: var(--muted);
		background: var(--soft);
	}

	:global(.link.meta-link:active) {
		transform: scale(0.96);
	}

	:global(.link.meta-link) :global(svg) {
		width: 1.25em;
		height: 1.25em;
		display: block;
	}

	.prose {
		padding: 1.25rem 0 4rem;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.link.meta-link) {
			transition: none;
		}
	}
</style>
