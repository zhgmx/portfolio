<script lang="ts">
	import type { Snippet } from 'svelte';
	import { previewParts } from './content';

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

	let showFavicon = $state(true);

	const preview = $derived(previewParts(href));
	const faviconUrl = $derived(`https://www.google.com/s2/favicons?domain=${preview.host}&sz=64`);
</script>

<a
	class="link {className}"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noreferrer' : undefined}
	aria-label={label ? undefined : ariaLabel}
>
	{#if children}
		{@render children()}
	{:else if icon}
		<img class="link-icon" width="16" height="16" src={icon} alt="" />
	{/if}
	{#if label}{label}{/if}{#if external && showFavicon}<span class="tip" aria-hidden="true">
			<span class="tip-row">
				<img class="tip-favicon" src={faviconUrl} alt="" onerror={() => (showFavicon = false)} />
				<span class="tip-host">{preview.host}</span>
				<svg class="tip-arrow" viewBox="0 0 16 16"><path d="M4 12 12 4M6 4h6v6" /></svg>
			</span>
			{#if preview.path}<span class="tip-path">{preview.path}</span>{/if}
		</span>{/if}</a
>
