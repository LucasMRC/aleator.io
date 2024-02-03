<script lang="ts">
    import Icon from "./icon.svelte";
    import { theme } from "../store";
</script>

<a class="coffee-link" target="_blank" href="http://buymeacoffee.com/lucas.maria" rel="noopener noreferrer" title="Invitame un café">
    <Icon type="coffee" color={$theme === 'light' ? '#352D2C' : '#8D99AE'} size={36} viewBox="0 0 24 30" />
</a>

<style>
    a.coffee-link {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }
</style>