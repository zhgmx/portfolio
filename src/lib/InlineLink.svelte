<script lang="ts">
	import Tooltip from './Tooltip.svelte';
	import type { Snippet } from 'svelte';
	import { previewHtml, previewParts } from './links';

	let {
		href,
		label,
		icon,
		ariaLabel,
		external = true,
		class: className = '',
		children
	}: Props = $props();

	interface Props {
		href: string;
		label?: string;
		icon?: string;
		ariaLabel?: string;
		external?: boolean;
		class?: string;
		children?: Snippet;
	}

	const isExternal = $derived(external && previewParts(href).external);
</script>

<a
	class="link {className}"
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noreferrer' : undefined}
	aria-label={label ? undefined : ariaLabel}
	data-cuelume-press="press"
	data-cuelume-release="release"
>
	{#if children}
		{@render children()}
	{:else if icon}
		<img class="link-icon" width="16" height="16" src={icon} alt="" />
	{/if}
	{#if label}{label}{/if}{#if isExternal}<Tooltip>
			{@html previewHtml(href)}
		</Tooltip>{/if}</a
>
