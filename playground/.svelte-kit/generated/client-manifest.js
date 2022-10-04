export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/__layout-blank.svelte"),
	() => import("../../src/routes/search/__layout.svelte"),
	() => import("../../src/routes/clicker/index.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/login/index@blank.svelte"),
	() => import("../../src/routes/search/[question]/index.svelte"),
	() => import("../../src/routes/search/index.svelte")
];

export const dictionary = {
	"": [[0, 5], [1]],
	"clicker": [[0, 4], [1], 1],
	"login@blank": [[2, 6], [1], 1],
	"search": [[0, 3, 8], [1]],
	"search/[question]": [[0, 3, 7], [1]]
};