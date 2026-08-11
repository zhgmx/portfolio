import { getProjects, getWriting } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { projects: getProjects(), writing: getWriting() };
};
