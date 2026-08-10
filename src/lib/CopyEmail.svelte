<script lang="ts">
	import IconCheckRegular from 'phosphor-icons-svelte/IconCheckRegular.svelte';
	import IconCopyRegular from 'phosphor-icons-svelte/IconCopyRegular.svelte';
	import IconEnvelopeSimpleRegular from 'phosphor-icons-svelte/IconEnvelopeSimpleRegular.svelte';

	let { label = '', class: className = '' }: Props = $props();

	interface Props {
		label?: string;
		class?: string;
	}

	const EMAIL = 'mx@zhgmx.com';
	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy(event?: MouseEvent) {
		event?.stopPropagation();
		let ok = false;
		try {
			await navigator.clipboard.writeText(EMAIL);
			ok = true;
		} catch {
			const textarea = document.createElement('textarea');
			textarea.value = EMAIL;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			ok = document.execCommand('copy');
			textarea.remove();
		}
		if (ok) {
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1600);
		}
	}

	function copyKey(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			event.stopPropagation();
			copy();
		}
	}
</script>

<span
	class="copy-email {className}"
	class:copied-visible={copied}
	role="button"
	tabindex="0"
	onclick={copy}
	onkeydown={copyKey}
	aria-label="Copy email address"
>
	{#if label}{label}{:else}<IconEnvelopeSimpleRegular class="mail-icon" />{/if}

	<span
		class="tip"
		role="button"
		tabindex="-1"
		onclick={(event) => copy(event)}
		onkeydown={copyKey}
		aria-label="Copy email address"
	>
		<span class="label" class:hidden={copied}>
			<IconCopyRegular />
			Click to copy
		</span>
		<span class="label" class:hidden={!copied}>
			<IconCheckRegular />
			Copied
		</span>
	</span>
</span>

<style>
	.copy-email {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.copy-email :global(.tip) {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		width: 8.75rem;
		pointer-events: none;
		transition:
			opacity 150ms var(--ease-out),
			transform 150ms var(--ease-out),
			width 150ms var(--ease-out);
	}

	.copy-email:hover :global(.tip) {
		pointer-events: auto;
	}

	.copy-email.copied-visible:hover :global(.tip) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.copy-email.copied-visible :global(.tip) {
		width: 6.75rem;
	}

	.copy-email:hover :global(.tip:hover) {
		background: var(--soft);
	}

	.copy-email :global(.tip .label) {
		grid-area: 1 / 1;
		justify-content: center;
	}

	.mail-icon {
		width: 1.125em;
		height: 1.125em;
	}

	.label {
		grid-area: 1 / 1;
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		white-space: nowrap;
		font-weight: 600;
		color: var(--ink);
		transition:
			opacity 150ms var(--ease-out),
			transform 150ms var(--ease-out);
	}

	.label.hidden {
		opacity: 0;
		transform: translateY(2px);
	}

	.label :global(svg) {
		width: 1em;
		height: 1em;
	}

	@media (prefers-reduced-motion: reduce) {
		.label {
			transition: none;
		}
	}
</style>
