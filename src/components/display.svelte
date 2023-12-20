<script lang="ts">
import {
		word,
		displayingTimer
	} from '../store';

</script>

<div class="display-container">
	<p class={`instructions${$displayingTimer ? ' hidden' : ''}`}>Click/Tap o Espacio</p>
    <h1 id="word">{$word}</h1>
</div>

<style>
    h1#word {
		font-size: 6rem;
		text-transform: capitalize;
		text-align: center;
		font-weight: lighter;
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
		h1#word {
			font-size: 2.5rem;
		}

		div.display-container {
			grid-row: 2;
		}
	}
</style>