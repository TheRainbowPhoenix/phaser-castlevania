<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

    export let name: string =""

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>


<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
    <i>
        <slot name="icon">
            <div class="placeholder"></div>
        </slot>
    </i>
    <span>{name}</span>
</button>

<style>
    button {
        border: none;
        margin: 0;
        display: flex;
        background: #282828;
        border-bottom: 1px solid #232323;
        border-top: 2px solid #282828;
        border-top-right-radius: .375rem;
        align-items: center;
        border-right: 1px solid #282828;

        padding: 2px 5px;
        padding-top: 0px;
        padding-right: 12px;
        /* min-width: 102px; */
    }

    button:hover {
        border-bottom: 1px solid #232323;
        border-top: 2px solid #303030;
        background: #303030;
        border-right: 1px solid #303030;
    }

    i {
        width: 16px;
        height: 16px;
        padding: 2px;
        font-style: inherit;
        color: #C4C4C4;
    }

    span {
        line-height: 24px;
        color: #D2D2D2;
    }
	
    button.selected:hover,
	.selected {
		border-top: 2px solid #3A79BB;
        border-right: 1px solid #232323;
		background: #3C3C3C;
        border-bottom: 1px solid #3C3C3C;
	}

    .placeholder {
        border: 1px solid #C4C4C4;
        margin: 2px;
        width: 10px;
        height: 10px;
        border-radius: .125rem;
    }
</style>