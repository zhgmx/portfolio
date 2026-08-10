<script lang="ts">
	import IconArrowUpRightRegular from 'phosphor-icons-svelte/IconArrowUpRightRegular.svelte';

	let { src, alt = '' }: Props = $props();

	interface Props {
		src?: string;
		alt?: string;
	}
</script>

<div class="project-thumb">
	{#if src}
		<img {src} {alt} loading="lazy" />
	{:else}
		<span class="project-placeholder" aria-hidden="true"><IconArrowUpRightRegular /></span>
	{/if}
</div>

<style>
	.project-thumb {
		display: block;
		aspect-ratio: 16 / 10;
		border-radius: 0.5rem;
		border: 1px solid var(--hairline);
		overflow: hidden;
		background: var(--soft);
	}

	.project-thumb :global(img) {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 150ms var(--ease-out);
	}

	.project-placeholder {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		color: var(--muted);
	}

	.project-placeholder :global(svg) {
		width: 1.5em;
		height: 1.5em;
	}

	@media (prefers-reduced-motion: reduce) {
		.project-thumb :global(img) {
			transition: none;
		}
	}
</style>
