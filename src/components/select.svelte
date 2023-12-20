<script lang="ts">
    import { openedSelect } from "../store";
    import { generateUUID } from "../utils";
    import Icon from "./icon.svelte";
    import { theme } from "../store";

    export let name: string | undefined;
    export let value: string | null;
    export let options: { value: string | null; label: string; default?: boolean }[] = [];
    export let handleChange: (e: Event) => void;

    const selectId = generateUUID();

    $: inputValue = options.find((option) =>
        value ? option.value === value : option.default
    )?.label ?? '';
    $: opened = $openedSelect === selectId;

    function handleClickOnOption(e: Event) {
        openedSelect.set('');
        e.preventDefault();
        handleChange(e);
    }

    function handleToggleMenu(e: Event) {
        const target = e.target as HTMLDivElement;
        e.preventDefault();
        if ($openedSelect === selectId) {
            openedSelect.set('');
        } else {
            openedSelect.set(target.id);
        }
        opened = !opened;
    }
</script>

<div class="custom-select no-new-word">
    <select hidden id={name} value={value}>
        {#each options as option}
            <option value={option.value}>{option.label}</option>
        {/each}
    </select>
    <button class="custom-input no-new-word" id={selectId} on:click={handleToggleMenu}>
        {inputValue}
        <span class="select-icon no-new-word">
            <Icon color={$theme === 'light' ? '#BEA8A7' : '#8D99AE'} size={16} type={opened ? 'chevron_sm_up' : 'chevron_sm_down'} viewBox="0 0 16 16" />
        </span>
    </button>
    {#if opened}
    <div class="select-menu no-new-word">
            {#each options as option}
                <label class="select-option no-new-word">
                    <input
                        type="radio"
                        class="no-new-word"
                        id={option.value}
                        {name}
                        checked={value === option.value || !value && option.default}
                        value={option.value}
                        on:change={handleClickOnOption}
                        on:click={() => value === option.value && openedSelect.set('')}
                        hidden
                    />
                    {option.label}
                </label>
            {/each}
        </div>
    {/if}
</div>

<style>
    div.custom-select {
        position: relative;
        width: 100%;
    }

    button.custom-input, div.select-menu {
        border-radius: .5rem;
        border: none;
        background-color: var(--background-secondary-color);
        text-align: left;
        color: var(--font-secondary-color);
        width: 100%;
    }

    button.custom-input {
        padding: .25rem .75rem;
        position: relative;
    }

    button.custom-input:hover {
        transform: none;
    }

    .select-icon {
        position: absolute;
        right: .75rem;
        top: 50%;
        transform: translateY(-50%);
    }

    div.select-menu {
        overflow: hidden;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 2;
        max-height: 10.5rem;
        overflow-y: auto;
    }

    label.select-option:not(:has(input:checked)):hover {
        cursor: pointer;
        color: var(--font-primary-color);
    }
    label.select-option:has(input:checked) {
        font-weight: bold;
    }

    label.select-option {
        display: block;
        padding-inline: .75rem;
        line-height: 1.5;
    }

</style>