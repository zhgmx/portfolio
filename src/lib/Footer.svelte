<script lang="ts">
	import IconGithubLogoRegular from 'phosphor-icons-svelte/IconGithubLogoRegular.svelte';
	import InlineLink from './InlineLink.svelte';
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<p class="copyright">© 2026 Max Zhang</p>
		<div class="footer-right">
			<InlineLink
				class="source-link"
				href="https://github.com/zhgmx/portfolio"
				ariaLabel="View source"
			>
				<IconGithubLogoRegular />
				View source
			</InlineLink>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		max-width: 40rem;
		margin: 0 auto;
		padding: 0 1.5rem;
		color: var(--muted);
	}

	.footer-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		border-top: 1px solid var(--hairline);
		padding: 1.5rem 0 2rem;
		font-size: 0.8125rem;
	}

	.copyright {
		margin: 0;
	}

	.footer-right {
		display: flex;
		align-items: center;
		gap: 0.75rem 1rem;
		flex-wrap: wrap;
		text-align: right;
	}

	:global(.link.source-link) {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--muted);
	}

	:global(.link.source-link > svg) {
		width: 1em;
		height: 1em;
	}

	@media (hover: hover) and (pointer: fine) {
		:global(.link.source-link:hover) {
			color: var(--ink);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.link.source-link) {
			transition: none;
		}
	}
</style>
