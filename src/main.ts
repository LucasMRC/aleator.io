import './app.css'
import './reset.css'
// @ts-ignore
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
})

export default app