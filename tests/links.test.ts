import { test } from 'node:test';
import assert from 'node:assert/strict';
import { previewHtml, previewParts } from '../src/lib/links';

test('only absolute HTTP links receive external previews', () => {
	for (const href of ['/projects/akasha', '#about', 'mailto:mx@zhgmx.com', 'tel:123', 'invalid']) {
		assert.equal(previewParts(href).external, false);
		assert.equal(previewHtml(href), '');
	}
	assert.deepEqual(previewParts('https://www.example.com/docs'), {
		host: 'example.com',
		path: '/docs',
		external: true
	});
});

test('destination previews escape text and defer favicon requests', () => {
	const html = previewHtml('https://example.com/a&b');
	assert.match(html, /example\.com/);
	assert.match(html, /a&amp;b/);
	assert.match(html, /<img class="tip-favicon"/);
	assert.match(
		html,
		/data-src="https:\/\/www\.google\.com\/s2\/favicons\?domain=example\.com&amp;sz=64"/
	);
	assert.doesNotMatch(html, /\ssrc=|onerror=/);
});
