<script lang="ts">
    import { theme } from "../store";
    import Icon from "./icon.svelte";

	const handleThemeChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.checked) {
			const newTheme = input.id as Theme;
			theme.set(newTheme);
			localStorage.setItem('theme', newTheme);
		}
	};

</script>

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

<style>
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
</style>