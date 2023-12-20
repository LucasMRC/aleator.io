<script lang="ts">
    import { onMount } from 'svelte';
	import * as dictionary from './diccionario.json';
	import {
		word,
		theme,
		displayingTimer,
		chosenDictionary
	} from './store';
    import ThemeSelector from './components/theme-selector.svelte';
    import Settings from './components/settings.svelte';
    import Display from './components/display.svelte';

	const handleNewWord = () => {
		const newWord = dictionary[$chosenDictionary][Math.floor(Math.random() * dictionary[$chosenDictionary].length)];
		word.set(newWord);
	};

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) theme.set(storedTheme as Theme);
		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if ($displayingTimer) return;
			if (e.code === 'Space')
				handleNewWord();
		});
		document.body.addEventListener('click', e => {
			e.stopPropagation();
			const target = e.target as HTMLElement;
			if ($displayingTimer || target.classList.contains('no-new-word')) return;
			handleNewWord();
		});
		handleNewWord();
	});
</script>

<main class="screen" data-theme={$theme}>
	<ThemeSelector />
	<Settings dictionary={dictionary} handleNewWord={handleNewWord} />
	<Display />
</main>

<style>
	:root {
		--light-theme-primary-background-color: #F4DBD8;
		--light-theme-secondary-background-color: #edcfcc;
		--light-theme-primary-font-color:  #BEA8A7;
		--light-theme-secondary-font-color:  #736160;
		--dark-theme-primary-background-color: #2B2D42;
		--dark-theme-secondary-background-color: #393c54;
		--dark-theme-primary-font-color: #8D99AE;
		--dark-theme-secondary-font-color: #bdd0f1;
	}

	main.screen[data-theme="light"] {
		--background-primary-color: var(--light-theme-primary-background-color);
		--background-secondary-color: var(--light-theme-secondary-background-color);
		--font-primary-color: var(--light-theme-primary-font-color);
		--font-secondary-color: var(--light-theme-secondary-font-color);
	}

	main.screen[data-theme="dark"] {
		--background-primary-color: var(--dark-theme-primary-background-color);
		--background-secondary-color: var(--dark-theme-secondary-background-color);
		--font-primary-color: var(--dark-theme-primary-font-color);
		--font-secondary-color: var(--dark-theme-secondary-font-color);
	}

	main.screen {
		container-type: inline-size;
		position: relative;
		height: 100dvh;
		width: 100dvw;
		display: grid;
		place-items: center;
		font-family: Inconsolata;
		background-color: var(--background-primary-color);
		color: var(--font-primary-color)
	}

	@media screen
	and (orientation: landscape)
	and (height < 640px) {
		main.screen {
			grid-template-rows: 2fr 7fr;
		}
	}
</style>
