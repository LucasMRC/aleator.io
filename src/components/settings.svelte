<script lang="ts">
import { chosenDictionary, displayingTimer, timer, timeoutId } from "../store";
import Select from "./select.svelte";
import Toggle from "./toggle.svelte";

interface Props {
	dictionary: any;
	handleNewWord: () => void;
}

let { dictionary }: Props = $props();

const dictionaryOptions = [
	{ label: `Dic. 1 (${dictionary.one.length} palabras)`, value: "one" },
	{ label: `Dic. 2 (${dictionary.two.length} palabras)`, value: "two" },
	{ label: `Dic. 3 (${dictionary.three.length} palabras)`, value: "three" },
];

const handleTimerChange = (action: 'add' | 'subtract') => {
	if (action === 'add') {
		if ($timer >= 60) return;
			else timer.update(prev => ++prev);
	}
	else if ($timer <= 5) return;
		else timer.update(prev => --prev);
};

const handleDictionaryChange = (e: Event) => {
	const input = e.target as HTMLInputElement;
	const value = input.value as "one" | "two" | "three"
	if (value === $chosenDictionary) return;
	chosenDictionary.set(value);
}

const handleDisplayTimer = (e: Event) => {
	const input = e.target as HTMLInputElement;
	if (!input.checked) return clearTimeout($timeoutId);
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
	<Toggle value={$displayingTimer} name="timer-toggle" id="timer" onChange={handleDisplayTimer} options={toggleOptions} />
	<input class="no-new-word timer{$displayingTimer ? '' : ' hidden'}" type="number" id="seconds" value={$timer} aria-label="timer">
	<button onclick={() => handleTimerChange('add')} class="no-new-word add{$displayingTimer ? '' : ' hidden'}">+</button>
	<button onclick={() => handleTimerChange('subtract')} class="no-new-word subtract{$displayingTimer ? '' : ' hidden'}">-</button>
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
	grid-template-columns: 4fr 2fr;
	align-items: center;
	color: var(--font-secondary-color);
}

div.settings label.timer-label {
	padding: .25rem .75rem;
	/* grid-column: span 2; */
}

div.settings > div.select-container {
	grid-column: span 2;
}

div.settings > button {
	background: transparent;
	position: absolute;
	color: var(--font-primary-color);
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
	grid-column: span 2;
	pointer-events: none;
	color: var(--font-primary-color);
	outline: none;
	border: none;
	background: transparent;
	font-size: 3rem;
	width: 25rem;
	height: 3rem;
	font-family: inherit;
	font-weight: bold;
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

@media screen
and (orientation: landscape)
and (height < 640px) {
	div.settings {
		font-size: 1.1rem;
		row-gap: .25rem;
		top: 2rem;
		grid-template-columns: 4fr 3fr;
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
		font-size: 2rem;
	}
}
</style>
