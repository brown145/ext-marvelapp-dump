import App from '../svelte/popup/index.svelte';
const name = 'Marvel App Download Assistant';

const app = new App({
	target: document.body,
	props: { name }
});

window.app = app;

export default app;
