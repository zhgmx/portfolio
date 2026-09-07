import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseContent } from '../src/lib/server/content-parser';

const content = (fields = '', body = 'Body with **formatting**.') =>
	`---\ntitle: Example\nsummary: A plain summary.\n${fields}---\n${body}`;

test('published metadata keeps summary separate from Markdown body', () => {
	const entry = parseContent(content('order: 0\n'), 'example.md');
	assert.equal(entry.description, 'A plain summary.');
	assert.equal(entry.body, 'Body with **formatting**.');
	assert.equal(entry.order, 0);
	assert.equal(entry.draft, false);
});

test('drafts may omit a summary but publishing requires one', () => {
	assert.equal(parseContent('---\ntitle: Draft\ndraft: true\n---\nText', 'draft.md').draft, true);
	assert.throws(() => parseContent('---\ntitle: Published\n---\n**Text**', 'post.md'), /summary/);
	assert.throws(() => parseContent(content('draft: yes\n'), 'post.md'), /draft must be/);
});

test('empty and malformed metadata fails with the content filename', () => {
	for (const fields of [
		'order: \n',
		'date: \n',
		'date: 2026-02-30\n',
		'order: nope\n',
		'tech: Unknown\n',
		'unknown: value\n',
		'order: 1\norder: 2\n',
		'year: "2026\n'
	]) {
		assert.throws(() => parseContent(content(fields), 'broken.md'), /Invalid content in broken.md/);
	}
});

test('matching quotes preserve apostrophes and URLs reject non-web protocols', () => {
	assert.equal(
		parseContent(content().replace('Example', "James' project"), 'post.md').title,
		"James' project"
	);
	assert.equal(parseContent(content('year: "2026"\n'), 'post.md').year, '2026');
	for (const url of ['javascript:alert(1)', '/relative', 'invalid']) {
		assert.throws(() => parseContent(content(`url: ${url}\n`), 'post.md'), /absolute HTTP/);
	}
	assert.equal(
		parseContent(content('source: https://example.com/repo\n'), 'post.md').source,
		'https://example.com/repo'
	);
});
