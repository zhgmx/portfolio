import { getProjects, getWriting } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { projects: getProjects(), writing: getWriting() };
};
