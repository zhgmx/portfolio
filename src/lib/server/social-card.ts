import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import { person, siteUrl } from '$lib/seo';
import archivo from '$lib/assets/archivo-semibold.ttf?url';
import character from '../../../static/favicon.svg?raw';

export async function renderSocialCard(
	title: string,
	path: string
): Promise<Uint8Array<ArrayBuffer>> {
	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					height: '100%',
					padding: '64px 76px',
					background: '#fffcf5',
					color: '#282530',
					fontFamily: 'Archivo',
					fontWeight: 600,
					justifyContent: 'space-between'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { display: 'flex', alignItems: 'center', gap: 20 },
							children: [
								{
									type: 'img',
									props: {
										src: `data:image/svg+xml;base64,${btoa(character)}`,
										width: 104,
										height: 104
									}
								},
								{
									type: 'div',
									props: {
										style: { fontSize: 26, color: '#746b79' },
										children: path === '/' ? '@zhgmx' : person.name
									}
								}
							]
						}
					},
					{
						type: 'div',
						props: {
							style: {
								fontSize: title.length > 60 ? 56 : 80,
								lineHeight: 1.1,
								letterSpacing: '-2px',
								lineClamp: 3,
								textOverflow: 'ellipsis'
							},
							children: title
						}
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderTop: '2px solid #e7dfe8',
								paddingTop: 24,
								fontSize: 24,
								color: '#746b79'
							},
							children: new URL(siteUrl).hostname
						}
					}
				]
			}
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Archivo', data: await read(archivo).arrayBuffer(), weight: 600, style: 'normal' }
			]
		}
	);
	return new Uint8Array(new Resvg(svg).render().asPng());
}
