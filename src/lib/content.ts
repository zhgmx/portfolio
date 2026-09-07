export interface Entry {
	slug: string;
	title: string;
	date?: string;
	year?: string;
	url?: string;
	source?: string;
	image?: string;
	order?: number;
	tech?: string[];
	description: string;
	body: string;
	draft: boolean;
}
