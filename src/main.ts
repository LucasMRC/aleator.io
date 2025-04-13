import './app.css'
import './reset.css'
// @ts-ignore
import App from './App.svelte';
import { mount } from "svelte";

const app = mount(App, {
	target: document.getElementById('app') as HTMLElement,
})

export default app
