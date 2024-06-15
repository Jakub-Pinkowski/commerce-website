<script lang="ts">
    import CloseIcon from './icons/CloseIcon.svelte';

    export let toggleCartAndMenu: () => void;
</script>

<div class="flex w-full items-center justify-between p-6">
    <span class=" text-3xl">Cart</span>
    <CloseIcon {toggleCartAndMenu} />
</div>