import { getProjects, getWriting } from '$lib/content';
import type { Entry } from '$lib/content';
import type { PageServerLoad } from './$types';

function summary({ body: _body, html: _html, ...entry }: Entry) {
	return entry;
}

export const load: PageServerLoad = () => {
	return { projects: getProjects().map(summary), writing: getWriting().map(summary) };
};
