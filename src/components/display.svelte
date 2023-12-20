<script lang="ts">
import {
		word,
		displayingTimer
	} from '../store';

</script>

<div>
	<p class={`instructions${$displayingTimer ? ' hidden' : ''}`}>Click/Tap o Espacio</p>
    <h1 id="word">{$word}</h1>
</div>

<style>
    h1#word {
		font-size: 6rem;
		text-transform: capitalize;
		text-align: center;
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
</style>