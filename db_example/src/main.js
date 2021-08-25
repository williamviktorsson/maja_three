import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Kan du hacka mig nu då?',
	}
});

export default app;