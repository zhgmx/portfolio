<script lang="ts">
	import { onMount } from 'svelte';
	import { setEnabled } from 'cuelume';
	import IconSpeakerHighRegular from 'phosphor-icons-svelte/IconSpeakerHighRegular.svelte';
	import IconSpeakerNoneRegular from 'phosphor-icons-svelte/IconSpeakerNoneRegular.svelte';

	const STORAGE_KEY = 'cuelume-enabled';

	function readEnabled() {
		try {
			return localStorage.getItem(STORAGE_KEY) !== 'false';
		} catch {
			return true;
		}
	}

	let enabled = $state(readEnabled());

	onMount(() => setEnabled(enabled));

	function toggle() {
		enabled = !enabled;
		setEnabled(enabled);
		try {
			localStorage.setItem(STORAGE_KEY, String(enabled));
		} catch {}
	}
</script>

<button
	class="toggle"
	type="button"
	onclick={toggle}
	aria-label={enabled ? 'Mute interface sounds' : 'Enable interface sounds'}
	aria-pressed={!enabled}
	data-cuelume-toggle
>
	<span class="icon icon-enabled" class:visible={enabled} aria-hidden="true">
		<IconSpeakerHighRegular />
	</span>
	<span class="icon icon-disabled" class:visible={!enabled} aria-hidden="true">
		<IconSpeakerNoneRegular />
	</span>
</button>

<style>
	.toggle {
		position: relative;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 1px solid var(--hairline);
		border-radius: 999px;
		background: transparent;
		color: var(--ink);
		cursor: pointer;
		transition:
			transform 120ms var(--ease-out),
			color 150ms var(--ease-out),
			background-color 150ms var(--ease-out),
			border-color 150ms var(--ease-out);
	}

	.icon {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		opacity: 0;
		transition: opacity 150ms var(--ease-out);
	}

	.icon.visible {
		opacity: 1;
	}

	.icon :global(svg) {
		width: 1.125em;
		height: 1.125em;
	}

	.toggle:active {
		transform: scale(0.96);
	}

	@media (hover: hover) and (pointer: fine) {
		.toggle:hover {
			color: var(--muted);
			background: var(--soft);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle,
		.icon {
			transition: none;
		}
	}
</style>
