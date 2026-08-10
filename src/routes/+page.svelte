<script lang="ts">
	import IconGithubLogoRegular from 'phosphor-icons-svelte/IconGithubLogoRegular.svelte';
	import IconLinkedinLogoRegular from 'phosphor-icons-svelte/IconLinkedinLogoRegular.svelte';
	import { onNavigate } from '$app/navigation';
	import CopyEmail from '$lib/CopyEmail.svelte';
	import InlineLink from '$lib/InlineLink.svelte';
	import ProjectThumb from '$lib/ProjectThumb.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import { techLinks } from '$lib/tech';
	import type { PageProps } from './$types';

	let { data } = $props();

	onNavigate(() => {
		sessionStorage.setItem('portfolio-visited', '1');
	});

	const socials = [
		{ label: 'GitHub', href: 'https://github.com/zhgmx', icon: IconGithubLogoRegular },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/zhgmx',
			icon: IconLinkedinLogoRegular
		}
	];

	const stack = [
		{
			label: 'Languages',
			items: ['TypeScript', 'JavaScript', 'Java', 'Kotlin', 'Rust']
		},
		{
			label: 'Web',
			items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Express', 'Node.js']
		},
		{
			label: 'Tools',
			items: ['Docker', 'Podman', 'Git', 'Cloudflare', 'Tailscale', 'Linux', 'Figma']
		},
		{
			label: 'AI',
			items: ['Codex', 'Claude']
		}
	];

	const experience = [
		{
			role: 'Web Developer & Consultant',
			company: 'Assessment Solutions LLC',
			companyHref: 'https://assessmentsolutionsllc.com/',
			location: 'New York, NY',
			dates: 'Nov 2025 – Present',
			detail:
				'Led the company\u2019s website development and deployment end to end, from interface to infrastructure, using Vite, React 18, TypeScript, and Tailwind CSS for a research and consulting firm.'
		},
		{
			role: 'Software Engineer Intern',
			company: 'Virtuos',
			companyHref: 'https://www.virtuosgames.com/',
			location: 'Shanghai, China',
			dates: 'Jul – Aug 2026',
			detail:
				'Developed internal systems in the ERP department, working on-site with the team in Shanghai.'
		}
	];
</script>

<svelte:head>
	<title>Max Zhang</title>
	<meta name="description" content="Computer Science student at Stony Brook University." />
</svelte:head>

<div class="shell">
	<main>
		<section class="hero">
			<div class="hero-top">
				<h1>Max Zhang</h1>
				<div class="top-links">
					{#each socials as link}
						{@const Icon = link.icon}
						<InlineLink class="icon-link" href={link.href} ariaLabel={link.label}>
							<Icon />
						</InlineLink>
					{/each}
					<CopyEmail class="top-email" />
					<ThemeToggle />
				</div>
			</div>
			<p class="role">@zhgmx</p>
		</section>

		<section class="section about">
			<h2>About</h2>
			<p>
				I'm currently studying at
				<InlineLink href="https://www.stonybrook.edu/" label="Stony Brook University" />, pursuing a
				B.S. in Computer Science. Previously, I interned at
				<InlineLink href="https://www.virtuosgames.com/" label="Virtuos" />, where I assisted with
				development of internal systems in the ERP department. I'm always open to new opportunities,
				so feel free to reach out!
			</p>
			<p>
				A lot of my past work lives in the Minecraft ecosystem: proxies, mods, and the stats sites
				and APIs around them. More recently I've been moving toward AI tooling and LLM
				experimentation. You can find most of my work on
				<InlineLink href="https://github.com/zhgmx" label="GitHub" />.
			</p>
		</section>

		<section class="section">
			<h2>Experience</h2>
			<div class="jobs">
				{#each experience as job}
					<div class="job">
						<div class="job-row">
							<span class="job-role">{job.role}</span>
							<span class="job-dates">{job.dates}</span>
						</div>
						<div class="job-row">
							<span class="job-company">
								<InlineLink href={job.companyHref} label={job.company} />
							</span>
							<span class="job-location">{job.location}</span>
						</div>
						<p class="job-detail">{job.detail}</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Stack</h2>
			{#each stack as group}
				<div class="stack-group">
					<span class="stack-label">{group.label}</span>
					<ul class="stack">
						{#each group.items as name}
							{@const tech = techLinks[name]}
							<li>
								<InlineLink
									class="stack-item"
									href={tech.href}
									icon={`/skills/${tech.icon}.svg`}
									label={name}
								/>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</section>

		<section class="section">
			<h2>Projects</h2>
			<div class="items">
				{#each data.projects as project}
					<a class="project" href={`/projects/${project.slug}`}>
						<ProjectThumb src={project.image} />
						<span class="project-main">
							<span class="project-title">{project.title}</span>
							<span class="project-description">{project.description}</span>
						</span>
					</a>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Writing</h2>
			<div class="items">
				{#each data.writing as post}
					<a class="item" href={`/writing/${post.slug}`}>
						<span class="item-title">{post.title}</span>
						<span class="item-description">{post.description}</span>
					</a>
				{/each}
			</div>
		</section>

		<section class="section">
			<h2>Contact</h2>
			<p>
				You can contact me at
				<CopyEmail label="mx@zhgmx.com" class="email-copy" /> or on <InlineLink
					href="https://linkedin.com/in/zhgmx">LinkedIn</InlineLink
				>.
			</p>
			<p class="subtext">
				Please read this before messaging:
				<InlineLink href="https://nohello.net/" label="nohello.net" />
			</p>
		</section>
	</main>
</div>

<style>
	.shell {
		max-width: 40rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.hero {
		padding: 3.5rem 0 2.25rem;
	}

	.hero-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	h1 {
		font-weight: 600;
		line-height: 1.25;
		margin: 0;
	}

	.role {
		color: var(--muted);
		margin: 0.125rem 0 0;
	}

	.top-links {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	:global(.link.icon-link) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		color: var(--muted);
		text-decoration: none;
		transition:
			color 150ms var(--ease-out),
			background-color 150ms var(--ease-out),
			transform 120ms var(--ease-out);
	}

	:global(.link.icon-link:hover) {
		color: var(--ink);
		background: var(--soft);
	}

	:global(.link.icon-link:active) {
		transform: scale(0.96);
	}

	:global(.link.icon-link) :global(svg) {
		width: 1.125em;
		height: 1.125em;
	}

	:global(.copy-email.top-email) {
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 999px;
		color: var(--muted);
		transition:
			color 150ms var(--ease-out),
			background-color 150ms var(--ease-out),
			transform 120ms var(--ease-out);
	}

	:global(.copy-email.top-email:hover) {
		color: var(--ink);
		background: var(--soft);
	}

	:global(.copy-email.top-email:active) {
		transform: scale(0.96);
	}

	:global(.copy-email.top-email) :global(.mail-icon) {
		width: 1.125em;
		height: 1.125em;
	}

	:global(.top-links .tip) {
		top: calc(100% + 0.625rem);
		bottom: auto;
		transform-origin: left top;
	}

	:global(.top-links .tip::after) {
		top: -5px;
		bottom: auto;
		border-top: 1px solid var(--hairline);
		border-left: 1px solid var(--hairline);
		border-right: none;
		border-bottom: none;
	}

	:global(.copy-email.email-copy) {
		font-weight: 600;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-color: var(--hairline);
		text-underline-offset: 3px;
		transition:
			color 150ms var(--ease-out),
			text-decoration-color 150ms var(--ease-out);
	}

	:global(.copy-email.email-copy:hover) {
		color: var(--muted);
		text-decoration-color: currentColor;
	}

	.section {
		padding: 2.25rem 0;
	}

	h2 {
		font-weight: 600;
		margin: 0 0 1.25rem;
	}

	.section p {
		margin: 0 0 0.875rem;
	}

	.section p:last-child {
		margin-bottom: 0;
	}

	.about p {
		color: var(--muted);
	}

	.about :global(.link) {
		color: var(--ink);
	}

	.about :global(.link:hover) {
		color: var(--muted);
	}

	.subtext {
		color: var(--muted);
	}

	.jobs {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.job {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.job-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0 1.5rem;
		align-items: baseline;
	}

	.job-role {
		font-weight: 600;
	}

	.job-dates,
	.job-location {
		color: var(--muted);
		text-align: right;
	}

	.job-detail {
		margin: 1.5rem 0 0;
		color: var(--muted);
	}

	.stack-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.stack-group:last-child {
		margin-bottom: 0;
	}

	.stack-label {
		color: var(--muted);
		font-weight: 600;
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.items {
		display: flex;
		flex-direction: column;
	}

	.item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.875rem 0;
		transition: transform 120ms var(--ease-out);
	}

	.item + .item {
		border-top: 1px solid var(--hairline);
	}

	.item-title,
	.project-title {
		font-weight: 600;
		transition: color 150ms var(--ease-out);
	}

	.item-description,
	.project-description {
		color: var(--muted);
	}

	.item {
		gap: 0.25rem;
	}

	.project-main {
		gap: 0.25rem;
	}

	.item:hover .item-title {
		color: var(--muted);
	}

	.item:active {
		transform: scale(0.98);
	}

	.project {
		display: grid;
		grid-template-columns: 9rem 1fr;
		grid-template-rows: 5.625rem;
		gap: 0 1.25rem;
		align-items: center;
		padding: 0.75rem 0;
		border-radius: 0.5rem;
		transition: transform 120ms var(--ease-out);
	}

	.project + .project {
		border-top: 1px solid var(--hairline);
	}

	.project-main {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.project:hover .project-title {
		color: var(--muted);
	}

	.project:active {
		transform: scale(0.98);
	}

	@media (hover: hover) and (pointer: fine) {
		:global(.project:hover .project-thumb img) {
			transform: scale(1.03);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.item,
		.item-title,
		.project,
		.project-title,
		:global(.stack-item) {
			transition: none;
		}
	}

	@media (max-width: 30rem) {
		.project {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			gap: 0.75rem 0;
		}
	}
</style>
