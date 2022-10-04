export { matchers } from './client-matchers.js';

export const components = [
	() => import("../../src/routes/__layout.svelte"),
	() => import("../../src/routes/__error.svelte"),
	() => import("../../src/routes/search/__layout.svelte"),
	() => import("../../src/routes/annat.svelte"),
	() => import("../../src/routes/index.svelte"),
	() => import("../../src/routes/login/index.svelte"),
	() => import("../../src/routes/search/[question].svelte"),
	() => import("../../src/routes/search/index.svelte"),
	() => import("../../src/routes/settings/index.svelte"),
	() => import("../../src/routes/wordle/index.svelte")
];

export const dictionary = {
	"": [[0, 4], [1]],
	"annat": [[0, 3], [1]],
	"login": [[0, 5], [1]],
	"search": [[0, 2, 7], [1]],
	"settings": [[0, 8], [1], 1],
	"wordle": [[0, 9], [1], 1],
	"search/[question]": [[0, 2, 6], [1], 1]
};