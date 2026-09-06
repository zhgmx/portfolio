<script lang="ts">
	import type { Snippet } from 'svelte';
	import { positionTooltip } from './tooltips';

	let {
		children,
		open = false,
		instant = false
	}: { children: Snippet; open?: boolean; instant?: boolean } = $props();
	let tip = $state<HTMLSpanElement>();
	$effect(() => {
		if (!open || !tip?.parentElement) return;
		const trigger = tip.parentElement;
		const frame = requestAnimationFrame(() => positionTooltip(trigger));
		return () => cancelAnimationFrame(frame);
	});
</script>

<span
	bind:this={tip}
	class="tip"
	data-open={open || undefined}
	data-instant={instant || undefined}
	aria-hidden="true"
>
	{@render children()}
</span>
