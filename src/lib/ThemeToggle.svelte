<script lang="ts">
	import IconMoonRegular from 'phosphor-icons-svelte/IconMoonRegular.svelte';
	import IconSunRegular from 'phosphor-icons-svelte/IconSunRegular.svelte';

	let theme = $state<'light' | 'dark'>(
		typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
			? 'dark'
			: 'light'
	);

	function toggle() {
		const next = theme === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch (e) {}
	}
</script>

<button
	class="toggle"
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<span class="icon icon-sun" aria-hidden="true"><IconSunRegular /></span>
	<span class="icon icon-moon" aria-hidden="true"><IconMoonRegular /></span>
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
			background-color 150ms var(--ease-out);
	}

	.toggle:hover {
		color: var(--muted);
		background: var(--soft);
	}

	.toggle:active {
		transform: scale(0.96);
	}

	.icon {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		transition:
			opacity 150ms var(--ease-out),
			transform 150ms var(--ease-out);
	}

	.icon :global(svg) {
		width: 1.125em;
		height: 1.125em;
	}

	.icon-sun {
		opacity: 0;
		transform: scale(0.8);
	}

	.icon-moon {
		opacity: 1;
		transform: scale(1);
	}

	:global(html[data-theme='dark']) .icon-sun {
		opacity: 1;
		transform: scale(1);
	}

	:global(html[data-theme='dark']) .icon-moon {
		opacity: 0;
		transform: scale(0.8);
	}

	@media (prefers-reduced-motion: reduce) {
		.toggle,
		.icon {
			transition: none;
		}
	}
</style>
