<script lang="ts">
	let { copied = false, instant = false }: { copied?: boolean; instant?: boolean } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	class:copied
	class:instant
	aria-hidden="true"
>
	<rect x="3" y="5" width="18" height="14" rx="1" />
	<path class="first" d="M0 0H10" />
	<path class="second" d="M0 0H10" />
</svg>

<style>
	svg {
		width: 1.125em;
		height: 1.125em;
		flex: none;
		overflow: visible;
	}
	path {
		vector-effect: non-scaling-stroke;
		transition: transform 180ms var(--ease-in-out);
	}
	.first {
		transform: translate(3px, 6px) rotate(38deg) scaleX(1.14);
	}
	.second {
		transform: translate(12px, 13px) rotate(-38deg) scaleX(1.14);
	}
	rect {
		transform-origin: center;
		transition:
			opacity 180ms var(--ease-out),
			transform 180ms var(--ease-out);
	}
	.copied .first {
		transform: translate(5px, 12px) rotate(45deg) scaleX(0.57);
	}
	.copied .second {
		transform: translate(9px, 16px) rotate(-45deg) scaleX(1.41);
	}
	.copied rect {
		opacity: 0;
		transform: scale(0.95);
	}
	.instant path,
	.instant rect {
		transition: none;
	}
	@media (prefers-reduced-motion: reduce) {
		path,
		rect {
			transition: none;
		}
	}
</style>
