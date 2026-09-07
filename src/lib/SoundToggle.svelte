<script lang="ts">
	import { onMount } from 'svelte';
	import { readSoundEnabled, setSoundEnabled } from './sound';
	import IconSpeakerHighRegular from 'phosphor-icons-svelte/IconSpeakerHighRegular.svelte';
	import IconSpeakerNoneRegular from 'phosphor-icons-svelte/IconSpeakerNoneRegular.svelte';

	let enabled = $state(true);

	onMount(() => {
		enabled = readSoundEnabled();
	});

	function toggle() {
		enabled = !enabled;
		setSoundEnabled(enabled);
	}
</script>

<button
	class="preference-toggle"
	type="button"
	onclick={toggle}
	aria-label={enabled ? 'Mute interface sounds' : 'Enable interface sounds'}
	aria-pressed={!enabled}
	data-cuelume-toggle
>
	<span class="preference-icon icon-enabled" class:visible={enabled} aria-hidden="true">
		<IconSpeakerHighRegular />
	</span>
	<span class="preference-icon icon-disabled" class:visible={!enabled} aria-hidden="true">
		<IconSpeakerNoneRegular />
	</span>
</button>

<style>
	.preference-icon {
		opacity: 0;
	}
	.preference-icon.visible {
		opacity: 1;
	}
</style>
