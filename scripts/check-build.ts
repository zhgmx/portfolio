import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseContent } from '../src/lib/server/content-parser';

const output = '.svelte-kit/output/prerendered';
const sitemap = readFileSync(join(output, 'pages/sitemap.xml'), 'utf8');
const home = readFileSync(join(output, 'pages/index.html'), 'utf8');
assert.match(home, /class="tip-favicon"/);
assert.doesNotMatch(home, /\ssrc="https:\/\/www\.google\.com\/s2\/favicons/);

function checkPayload(path: string) {
	const payload: unknown = JSON.parse(readFileSync(path, 'utf8'));
	function visit(value: unknown) {
		if (!value || typeof value !== 'object') return;
		assert.ok(!Object.hasOwn(value, 'body'), `Raw Markdown leaked into ${path}`);
		assert.ok(!Object.hasOwn(value, 'draft'), `Draft metadata leaked into ${path}`);
		for (const child of Object.values(value)) visit(child);
	}
	visit(payload);
}

checkPayload(join(output, 'dependencies/__data.json'));
let published = 0;
for (const collection of ['projects', 'writing']) {
	for (const filename of readdirSync(`src/content/${collection}`).filter((name) =>
		name.endsWith('.md')
	)) {
		const source = `src/content/${collection}/${filename}`;
		const entry = parseContent(readFileSync(source, 'utf8'), source);
		const route = `${collection}/${filename.slice(0, -3)}`;
		for (const artifact of [
			`pages/${route}.html`,
			`pages/og/${route}.png`,
			`dependencies/${route}/__data.json`
		]) {
			assert.equal(existsSync(join(output, artifact)), !entry.draft, artifact);
		}
		assert.equal(sitemap.includes(`/${route}</loc>`), !entry.draft, route);
		assert.equal(home.includes(`href="/${route}"`), !entry.draft, route);
		if (!entry.draft) {
			published++;
			checkPayload(join(output, `dependencies/${route}/__data.json`));
		}
	}
}
console.log(
	`Verified ${published} published entries, draft exclusion, and lean prerendered payloads.`
);
