<script lang="ts">
    export let value: boolean;
    export let name: string;
    export let id: string;
    export let options: { value: boolean; label: string }[];
    export let onChange: (e: Event) => void;
</script>

<div class="options-container no-new-word">
    {#each options as option}
        <label class="switch no-new-word">
            <input class="no-new-word" type="radio" on:change={onChange} name={name} id={id} value={option.value} checked={value === option.value} hidden />
            {option.label}
        </label>
    {/each}
</div>

<style>
    div.options-container {
        border-radius: .5rem;
        display: flex;
        gap: .25rem;
        cursor: pointer;
        padding: .25rem;
        place-items: center;
    }

    label.switch {
        width: 50%;
        user-select: none;
        text-align: center;
        height: 100%;
        line-height: calc(3rem - 50%);
        cursor: pointer;
        color: var(--disabled-font-color);
        border-radius: .5rem;
    }

    label.switch:has(input[type="radio"]:checked) {
        background: var(--background-secondary-color);
        color: var(--primary-font-color);
        font-weight: bold;
    }
</style>