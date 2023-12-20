<script lang="ts">
    export let value: boolean;
    export let name: string;
    export let id: string;
    export let options: { value: string | number | boolean; label: string }[];
    export let onChange: (e: Event) => void;
</script>

<div class="options-container">
    {#each options as option}
        <input type="radio" on:change={onChange} name={name} id={id + "-" + option.value} value={option.value} checked={value === option.value} hidden />
        <label class="switch" for={id + "-" + option.value}>
            {option.label}
        </label>
    {/each}
</div>

<style>
    div.options-container {
        background: var(--secondary-color);
        margin-bottom: 1rem;
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
        transition: all .25s ease-in-out;
        cursor: pointer;
        color: var(--disabled-font-color);
    }

    input[type="radio"]:checked + label.switch  {
        background: #828282;
        color: var(--primary-font-color);
        border-radius: .5rem;
    }
</style>