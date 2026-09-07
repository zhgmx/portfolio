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
	class="preference-toggle"
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	data-cuelume-toggle
>
	<span class="preference-icon icon-sun" aria-hidden="true"><IconSunRegular /></span>
	<span class="preference-icon icon-moon" aria-hidden="true"><IconMoonRegular /></span>
</button>

<style>
	.icon-sun {
		opacity: 0;
	}
	.icon-moon {
		opacity: 1;
	}
	:global(html[data-theme='dark']) .icon-sun {
		opacity: 1;
	}
	:global(html[data-theme='dark']) .icon-moon {
		opacity: 0;
	}
</style>
