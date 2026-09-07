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

	const favicon = tip.querySelector<HTMLImageElement>('.tip-favicon[data-src]');
	const src = favicon?.getAttribute('data-src');
	if (favicon && src) {
		favicon.src = src;
		favicon.removeAttribute('data-src');
	}

	tip.style.setProperty('--tip-shift', '0px');
	tip.removeAttribute('data-side');
	const anchor = trigger.getBoundingClientRect();
	const margin = 16;
	const above = anchor.top - margin;
	const below = document.documentElement.clientHeight - anchor.bottom - margin;
	if (above < tip.offsetHeight + 10 && below > above) tip.dataset.side = 'below';
	const bounds = tip.getBoundingClientRect();
	const left = Math.max(
		margin,
		Math.min(bounds.left, document.documentElement.clientWidth - bounds.width - margin)
	);
	tip.style.setProperty('--tip-shift', `${left - bounds.left}px`);
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
		if (!trigger) return;
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

	function onEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			for (const tip of document.querySelectorAll('.tip')) tip.setAttribute('data-dismissed', '');
		}
	}

	function onImageError(event: Event) {
		const image = event.target;
		if (!(image instanceof HTMLImageElement) || !image.matches('.tip-favicon')) return;
		const trigger = image.closest('.link');
		image.remove();
		if (trigger) positionTooltip(trigger);
	}

	document.addEventListener('error', onImageError, true);
	document.addEventListener('keydown', onEscape);
	document.addEventListener('click', onEnter);
	document.addEventListener('pointerover', onEnter);
	document.addEventListener('focusin', onEnter);
	window.addEventListener('resize', positionVisibleTooltips);
	document.addEventListener('scroll', positionVisibleTooltips, true);
	return () => {
		document.removeEventListener('error', onImageError, true);
		cancelAnimationFrame(frame);
		document.removeEventListener('keydown', onEscape);
		document.removeEventListener('click', onEnter);
		document.removeEventListener('pointerover', onEnter);
		document.removeEventListener('focusin', onEnter);
		window.removeEventListener('resize', positionVisibleTooltips);
		document.removeEventListener('scroll', positionVisibleTooltips, true);
	};
}
