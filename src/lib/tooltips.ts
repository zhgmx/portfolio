export function positionVisibleTooltips() {
	for (const trigger of document.querySelectorAll(
		'.link:hover, .link:focus-visible, .copy-email:hover, .copy-email:focus-visible, .copy-email:has(.tip[data-open])'
	)) {
		positionTooltip(trigger);
	}
}

export function positionTooltip(trigger: Element) {
	const tip = trigger.querySelector<HTMLElement>('.tip');
	if (!tip || getComputedStyle(tip).display === 'none') return;

	tip.style.setProperty('--tip-shift', '0px');
	const bounds = tip.getBoundingClientRect();
	const margin = 16;
	const left = Math.max(
		margin,
		Math.min(bounds.left, document.documentElement.clientWidth - bounds.width - margin)
	);
	tip.style.setProperty('--tip-shift', `${left - bounds.left}px`);
	const anchor = trigger.getBoundingClientRect();
	const arrow = Math.max(
		12,
		Math.min(anchor.left + anchor.width / 2 - left - 4, bounds.width - 20)
	);
	tip.style.setProperty('--tip-arrow-left', `${arrow}px`);
}

export function bindTooltips(): () => void {
	let frame = 0;

	function onEnter(event: Event) {
		if (!(event.target instanceof Element)) return;
		const trigger = event.target.closest('.link, .copy-email');
		if (trigger) {
			if (
				event instanceof PointerEvent &&
				event.relatedTarget instanceof Node &&
				trigger.contains(event.relatedTarget)
			)
				return;
			for (const tip of document.querySelectorAll<HTMLElement>('.tip')) {
				if (tip.parentElement === trigger) tip.removeAttribute('data-dismissed');
				else tip.setAttribute('data-dismissed', '');
			}
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => positionTooltip(trigger));
		}
	}

	function onEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			for (const tip of document.querySelectorAll('.tip')) tip.setAttribute('data-dismissed', '');
		}
	}

	document.addEventListener('keydown', onEscape);
	document.addEventListener('click', onEnter);
	document.addEventListener('pointerover', onEnter);
	document.addEventListener('focusin', onEnter);
	window.addEventListener('resize', positionVisibleTooltips);
	return () => {
		cancelAnimationFrame(frame);
		document.removeEventListener('keydown', onEscape);
		document.removeEventListener('click', onEnter);
		document.removeEventListener('pointerover', onEnter);
		document.removeEventListener('focusin', onEnter);
		window.removeEventListener('resize', positionVisibleTooltips);
	};
}
