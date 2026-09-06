<script lang="ts">
	import { play } from 'cuelume';
	import { onDestroy } from 'svelte';
	import Tooltip from './Tooltip.svelte';
	import CopyStatusIcon from './CopyStatusIcon.svelte';

	let { label = '' }: { label?: string } = $props();
	const email = 'mx@zhgmx.com';
	const messages = { idle: 'Copy email', copied: 'Email copied', error: 'Copy unavailable' };
	let status = $state<keyof typeof messages>('idle');
	let busy = $state(false);
	let keyboard = $state(false);
	let disposed = false;
	let resetTimer: ReturnType<typeof setTimeout>;

	function fallbackCopy(): boolean {
		const focused = document.activeElement;
		const field = document.createElement('textarea');
		field.value = email;
		field.style.cssText = 'position:fixed;left:0;top:0;opacity:0';
		document.body.appendChild(field);
		try {
			field.select();
			return document.execCommand('copy');
		} catch {
			return false;
		} finally {
			field.remove();
			if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
		}
	}

	async function copy(event: MouseEvent) {
		if (busy) return;
		keyboard = event.detail === 0;
		busy = true;
		clearTimeout(resetTimer);
		let copied = false;
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
		} catch {
			if (!disposed) copied = fallbackCopy();
		}
		if (disposed) return;
		busy = false;
		status = copied ? 'copied' : 'error';
		if (copied) play('success', { volume: 0.35 });
		resetTimer = setTimeout(
			() => {
				status = 'idle';
			},
			copied ? 1800 : 4000
		);
	}

	onDestroy(() => {
		disposed = true;
		clearTimeout(resetTimer);
	});
</script>

<button
	class="copy-email"
	class:icon-copy={!label}
	class:text-copy={!!label}
	class:keyboard
	type="button"
	onclick={copy}
	onpointerdown={() => (keyboard = false)}
	onfocus={() => (keyboard = true)}
	aria-label={label ? `Copy ${label}` : 'Copy email address'}
	aria-busy={busy}
	data-cuelume-press="press"
>
	{#if label}
		{label}
	{:else}
		<CopyStatusIcon copied={status === 'copied'} instant={keyboard} />
	{/if}
	<Tooltip open={status !== 'idle'} instant={keyboard}>
		<span class="tip-row">
			<CopyStatusIcon copied={status === 'copied'} instant={keyboard} />
			<span class="feedback-states" class:changed={status !== 'idle'}>
				<span class="tip-host feedback-state idle" class:current={status === 'idle'}
					>{messages.idle}</span
				>
				<span class="tip-host feedback-state result" class:current={status !== 'idle'}
					>{status === 'error' ? messages.error : messages.copied}</span
				>
			</span>
		</span>
		<span class="tip-path">{email}</span>
	</Tooltip>
</button>

<span class="sr-only" role="status" aria-live="polite" aria-atomic="true">
	{status === 'copied'
		? 'Email address copied'
		: status === 'error'
			? `Could not copy. The email address is ${email}.`
			: ''}
</span>

<style>
	.copy-email {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		color: inherit;
		cursor: pointer;
		transition: transform 120ms var(--ease-out);
	}
	.icon-copy {
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		color: var(--muted);
	}
	.text-copy {
		font-weight: 600;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--hairline);
		text-underline-offset: 3px;
	}
	@media (hover: hover) and (pointer: fine) {
		.icon-copy:hover {
			background: var(--soft);
			color: var(--ink);
		}
		.text-copy:hover {
			color: var(--muted);
			text-decoration-color: currentColor;
		}
	}
	.copy-email:active {
		transform: scale(0.97);
	}
	.feedback-states {
		display: grid;
		overflow: hidden;
	}
	.feedback-state {
		grid-area: 1 / 1;
		transition:
			transform 180ms var(--ease-out),
			opacity 180ms var(--ease-out);
	}
	.result {
		transform: translateY(100%);
		opacity: 0;
	}
	.changed .idle {
		transform: translateY(-100%);
		opacity: 0;
	}
	.changed .result {
		transform: translateY(0);
		opacity: 1;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.keyboard .feedback-state,
	.keyboard {
		transition: none;
	}
	.keyboard:active {
		transform: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.copy-email:active,
		.feedback-state,
		.changed .idle,
		.changed .result {
			transform: none;
		}
		.feedback-state {
			transition: opacity 150ms var(--ease-out);
		}
	}
</style>
