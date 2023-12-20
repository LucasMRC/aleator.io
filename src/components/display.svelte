<script lang="ts">
import {
		word,
		displayingTimer
	} from '../store';
    import WordWrapper from './word-wrapper.svelte';

</script>

<div class="display-container">
	<p class={`instructions${$displayingTimer ? ' hidden' : ''}`}>Click/Tap o Espacio</p>
	<WordWrapper />
</div>

<style>
	div.display-container {
		display: grid;
		justify-items: center;
	}

	p.instructions {
		text-align: center;
		font-weight: bold;
	}

    @container (width < 640px) {
		h1#word {
			font-size: 2.5rem;
		}
	}

	@media screen
	and (orientation: landscape)
	and (height < 640px) {
		div.display-container {
			grid-row: 2;
		}
	}
</style>