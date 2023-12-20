<script lang="ts">
    import { onMount } from 'svelte';
	import * as dictionary from './diccionario.json';
	import {
		word,
		theme,
		displayingTimer,
		chosenDictionary,
		timer
	} from './store';
    import Select from './components/select.svelte';
    import Icon from './components/icon.svelte';

	let timerInterval: number;

	const dictionaryOptions = [
		{ label: `Diccionario 1 (pal. ${dictionary.one.length})`, value: "one" },
		{ label: `Diccionario 2 (pal. ${dictionary.two.length})`, value: "two" },
		{ label: `Diccionario 3 (pal. ${dictionary.three.length})`, value: "three" },
		{ label: `Diccionario 4 (pal. ${dictionary.four.length})`, value: "four" }
	];

	const handleTimerChange = (action: 'add' | 'subtract') => {
		if (action === 'add') {
			if ($timer >= 60) timer.set(60);
			else timer.update(prev => ++prev);
		}
		else if ($timer <= 5) timer.set(5);
		else timer.update(prev => --prev);
		clearInterval(timerInterval);
		timerInterval = setInterval(handleNewWord, $timer * 1000);
	};

	const handleNewWord = () => {
		const newWord = dictionary[$chosenDictionary][Math.floor(Math.random() * dictionary[$chosenDictionary].length)];
		word.set(newWord);
	};

	const handleThemeChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.checked) {
			const newTheme = input.id as Theme;
			theme.set(newTheme);
		}
	};

	const handleDictionaryChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		chosenDictionary.set(input.value as Dictionary);
	}

	const handleDisplayTimer = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.checked) timerInterval = setInterval(handleNewWord, $timer * 1000);
		else clearInterval(timerInterval);
		displayingTimer.set(input.checked);
	};

	onMount(() => {
		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.code === 'Space')
				handleNewWord();
		});
		document.body.addEventListener('click', e => {
			const target = e.target as HTMLElement;
			if ($displayingTimer || target.classList.contains('no-new-word')) return;
			handleNewWord();
		});
		handleNewWord();
	});
</script>

<main class="screen" data-theme={$theme}>
	<div class="theme-selector no-new-word">
		<label class="no-new-word">
			<Icon size={24} type="sun" color={$theme === 'light' ? '#BEA8A7' : '#8D99AE'} viewBox="0 0 85 85"/>
			<input on:change={handleThemeChange} class="no-new-word" type="radio" id="light" name="theme" hidden />
		</label>
		<label class="no-new-word">
			<Icon size={24} type="moon" color={$theme === 'light' ? '#BEA8A7' : '#8D99AE'} viewBox="0 -5 100 100"/>
			<input on:change={handleThemeChange} class="no-new-word" type="radio" id="dark" name="theme" hidden />
		</label>
	</div>
	<div class="settings">
		<div class="select-container">
			<Select name="dictionary" options={dictionaryOptions} handleChange={handleDictionaryChange} value={$chosenDictionary} />
		</div>
		<label class="no-new-word timer-label" for="timer">Timer</label>
		<input class="no-new-word" checked={$displayingTimer} type="checkbox" id="timer" on:change={handleDisplayTimer} on:keyup={(e) => false}>
		<input class="no-new-word{$displayingTimer ? '' : ' hidden'}" type="number" id="seconds" value={$timer}>
		<button on:click={() => handleTimerChange('add')} class="no-new-word add{$displayingTimer ? '' : ' hidden'}">+</button>
		<button on:click={() => handleTimerChange('subtract')} class="no-new-word subtract{$displayingTimer ? '' : ' hidden'}">-</button>
	</div>
	<div>
		{#if !$displayingTimer}
			<p class="instructions">Click/Tap o Espacio</p>
		{/if}
		<h1 id="word">{$word}</h1>
	</div>
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
		height: 100vh;
		width: 100vw;
		display: grid;
		place-items: center;
		font-family: Inconsolata;
		background-color: var(--background-primary-color);
		color: var(--font-primary-color)
	}

	h1#word {
		font-size: 6rem;
		text-transform: capitalize;
		text-align: center;
	}

	p.instructions {
		text-align: center;
		font-weight: bold;
	}

	div.theme-selector {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		display: flex;
		gap: .5rem;
	}

	div.theme-selector label {
		background: transparent;
		border: none;
	}

	div.settings {
		position: absolute;
		top: 4rem;
		left: 50%;
		translate: -50% 0;
		font-size: 1.5rem;
		width: max-content;
		display: grid;
		grid-template-columns: 1fr 5fr 1fr;
		align-items: center;
		color: var(--font-secondary-color);
	}

	div.settings label.timer-label {
		padding: .75rem;
		grid-column: span 2;
	}

	div.settings > div.select-container {
		grid-column: span 3;
	}

	div.settings > button {
		background: transparent;
		position: absolute;
		color: var(--font-secondary-color);
		border-radius: .3rem;
		font-weight: bold;
		bottom: 0;
		height: 3rem;
		width: 3rem;
		font-size: 2rem;
		font-family: inherit;
		border: none;
		transition: opacity ease 300ms;
	}

	div.settings > button.add {
		left: 7rem;
	}

	div.settings > button.subtract {
		right: 7rem;
	}

	input[type=checkbox] {
		/* Double-sized Checkboxes */
		-ms-transform: scale(1.5); /* IE */
		-moz-transform: scale(1.5); /* FF */
		-webkit-transform: scale(1.5); /* Safari and Chrome */
		-o-transform: scale(1.5); /* Opera */
		transform: scale(1.5);
		justify-self: center;
	}

	input[type=number] {
		transition: opacity ease 300ms;
		grid-column: span 3;
		pointer-events: none;
		color: var(--font-primary-color);
		outline: none;
		border: none;
		background: transparent;
		font-size: 3rem;
		width: 25rem;
		height: 3rem;
		font-family: inherit;
		text-align: center;
		/* Firefox */
		-moz-appearance: textfield;
		appearance: textfield;
		margin: 0;
	}

	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		/* Webkit */
		-webkit-appearance: none;
		margin: 0;
	}

	.hidden {
		opacity: 0;
		pointer-events: none;
	}

	@container (width < 640px) {
		h1#word {
			font-size: 2.5rem;
		}

		div.settings {
			font-size: 1.1rem;
			row-gap: .25rem;
		}

		div.settings > button {
			height: 2.5rem;
			width: 2.5rem;
			bottom: .75rem;
		}

		div.settings > button.add {
			left: 10rem;
		}

		div.settings > button.subtract {
			right: 10rem;
		}
		input[type=number] {
			width: 17rem;
		}
	}
</style>
