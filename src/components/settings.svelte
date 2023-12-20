<script lang="ts">
    import { chosenDictionary, displayingTimer, timer } from "../store";
    import Select from "./select.svelte";
    import Toggle from "./toggle.svelte";

    export let dictionary: any;
    export let handleNewWord: () => void;

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

	const handleDictionaryChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		chosenDictionary.set(input.value as Dictionary);
	}

	const handleDisplayTimer = (e: Event) => {
		const input = e.target as HTMLInputElement;
		clearInterval(timerInterval);
		if (input.checked && input.value === 'true') timerInterval = setInterval(handleNewWord, $timer * 1000);
		displayingTimer.set(input.value === 'true');
	};

    const toggleOptions = [
        { label: 'On', value: true },
        { label: 'Off', value: false }
    ];
</script>

<div class="settings">
    <div class="select-container">
        <Select name="dictionary" options={dictionaryOptions} handleChange={handleDictionaryChange} value={$chosenDictionary} />
    </div>
    <label class="no-new-word timer-label" for="timer">Timer</label>
    <Toggle value={$displayingTimer} name="timer-toggle" id="timer-toggle" onChange={handleDisplayTimer} options={toggleOptions} />
    <input class="no-new-word timer{$displayingTimer ? '' : ' hidden'}" type="number" id="seconds" value={$timer}>
    <button on:click={() => handleTimerChange('add')} class="no-new-word add{$displayingTimer ? '' : ' hidden'}">+</button>
    <button on:click={() => handleTimerChange('subtract')} class="no-new-word subtract{$displayingTimer ? '' : ' hidden'}">-</button>
</div>

<style>
    div.settings {
		position: absolute;
		top: 4rem;
		left: 50%;
		translate: -50% 0;
		font-size: 1.5rem;
		width: max-content;
		display: grid;
		grid-template-columns: 1fr 3fr 2fr;
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
	}

	div.settings > button.add {
		left: 7rem;
	}

	div.settings > button.subtract {
		right: 7rem;
	}

	input.timer {
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
	}

    @container (width < 640px) {
		div.settings {
			font-size: 1.1rem;
			row-gap: .25rem;
		}

		div.settings > button {
			height: 2.5rem;
			width: 2.5rem;
            line-height: 0;
		}

		div.settings > button.add {
			left: 10rem;
		}

		div.settings > button.subtract {
			right: 10rem;
		}
		input.timer {
			width: 17rem;
		}
	}

    @container (height < 640px) {
        div.settings {
			font-size: 1.1rem;
			row-gap: .25rem;
		}

		div.settings > button {
			height: 2.5rem;
			width: 2.5rem;
            line-height: 0;
		}

		div.settings > button.add {
			left: 10rem;
		}

		div.settings > button.subtract {
			right: 10rem;
		}
		input.timer {
			width: 17rem;
		}
    }
</style>