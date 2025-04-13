<script lang="ts">
import { timer, displayingTimer, word, timeoutId } from '../store'
import { createInterval } from '../utils'

let { handleNewWord } = $props();

let countdown = $derived($displayingTimer ? $timer : 0);
createInterval(() => {
	if ($timeoutId) clearTimeout($timeoutId);
	if (!$displayingTimer) return;
	if (!countdown) {
		countdown = $timer - 1;
		handleNewWord();
	} else countdown -= 1;
}, 1000);
</script>

<div class="circle">
	{#if $displayingTimer}
		<div class="progress-bar" style="--progress-value: {($timer	- countdown) / $timer * 100};"></div>
	{/if}
	<h1 id="word">{$word}</h1>
</div>

<style>
div.circle {
	border-radius: 50%;
	position: relative;
	width: 15rem;
	height: 15rem;
}

div.progress-bar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: radial-gradient(closest-side, var(--background-primary-color) 80%, transparent 82% 100%),
		conic-gradient(
		var(--background-secondary-color) calc(var(--progress-value) * 1%),
		var(--background-primary-color) calc((var(--progress-value) + 0.25) * 1%));
	transition: background linear 1s;
}

h1#word {
	font-size: 6rem;
	text-transform: capitalize;
	text-align: center;
	font-weight: lighter;
	position: absolute;
	width: max-content;
	max-width: 100dvw;
	top: 45%;
	left: 50%;
	translate: -50% -50%;
}

@container (width < 640px) {
	div.circle {
		width: 10rem;
		height: 10rem;
	}

	h1#word {
		font-size: 4rem;
	}
}

@media screen
and (orientation: landscape)
and (height < 640px) {
	div.circle {
		width: 5rem;
		height: 5rem;
	}

	h1#word {
		font-size: 3.5rem;
	}
}
</style>
