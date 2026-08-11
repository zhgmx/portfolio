<script lang="ts">
	import { play } from 'cuelume';
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
			play('success', { volume: 0.35 });
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 1600);
		}
	}
</script>

<button
	class="copy-email {className}"
	class:copied-visible={copied}
	type="button"
	onclick={copy}
	aria-label={label ? `Copy ${label}` : 'Copy email address'}
	data-cuelume-press="press"
>
	{#if label}{label}{:else}<IconEnvelopeSimpleRegular class="mail-icon" />{/if}

	<span class="tip" aria-hidden="true">
		<span class="label" class:hidden={copied}>
			<IconCopyRegular />
			Click to copy
		</span>
		<span class="label" class:hidden={!copied}>
			<IconCheckRegular />
			Copied
		</span>
	</span>
	<span class="touch-tip" class:touch-visible={copied} aria-hidden="true">
		<IconCheckRegular />
		Copied
	</span>
	<span class="sr-only" aria-live="polite" aria-atomic="true">
		{copied ? 'Email address copied' : ''}
	</span>
</button>

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

	.copy-email.copied-visible :global(.tip) {
		width: 6.75rem;
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

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (hover: hover) and (pointer: fine) {
		.copy-email:focus-visible :global(.tip) {
			opacity: 1;
			transform: translateY(0);
		}

		.copy-email:hover :global(.tip:hover) {
			background: var(--soft);
		}
	}

	.touch-tip {
		display: none;
	}

	@media (hover: none), (pointer: coarse) {
		.copy-email :global(.tip) {
			display: none;
		}

		.touch-tip {
			position: absolute;
			left: 50%;
			bottom: calc(100% + 0.625rem);
			z-index: 10;
			display: inline-flex;
			align-items: center;
			gap: 0.375rem;
			white-space: nowrap;
			padding: 0.375rem 0.75rem;
			background: var(--paper);
			border: 1px solid var(--hairline);
			border-radius: 999px;
			box-shadow: 0 12px 32px var(--shadow);
			font-weight: 600;
			color: var(--ink);
			opacity: 0;
			pointer-events: none;
			transform: translateX(-50%) translateY(4px) scale(0.92);
			transform-origin: bottom center;
			transition:
				opacity 150ms var(--ease-out),
				transform 150ms var(--ease-out);
		}

		.touch-tip.touch-visible {
			opacity: 1;
			transform: translateX(-50%) translateY(0) scale(1);
		}

		.touch-tip :global(svg) {
			width: 1em;
			height: 1em;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.label {
			transition: none;
		}

		.touch-tip {
			transition: opacity 150ms var(--ease-out);
		}
	}
</style>
