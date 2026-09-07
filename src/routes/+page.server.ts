import { getProjects, getWriting } from '$lib/server/content';
import type { Entry } from '$lib/content';
import type { PageServerLoad } from './$types';

function summary({ body: _body, draft: _draft, ...entry }: Entry) {
	return entry;
}

export const load: PageServerLoad = () => {
	return { projects: getProjects().map(summary), writing: getWriting().map(summary) };
};
