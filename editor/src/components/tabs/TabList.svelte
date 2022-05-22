<script lang="ts">
    export let locked: boolean = false
</script>

<div class="tab-list">
	<slot></slot>

    <div class="pane-control">
        <button
            on:click="{() => locked = !locked }"
        >
            {#if locked}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M7.832 1.755L8 1.75a2.75 2.75 0 0 1 2.745 2.582l.005.168V5h.75A1.5 1.5 0 0 1 13 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 12.5v-6A1.5 1.5 0 0 1 4.5 5h.75v-.5a2.75 2.75 0 0 1 2.582-2.745L8 1.75l-.168.005ZM8 8.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm.128-5.244L8 3.25a1.25 1.25 0 0 0-1.244 1.122L6.75 4.5V5h2.5v-.5a1.25 1.25 0 0 0-1.122-1.244L8 3.25l.128.006Z"/></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 11.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0-9A1.5 1.5 0 0 0 6.5 4v2h5A1.5 1.5 0 0 1 13 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-6A1.5 1.5 0 0 1 4.5 6h1V4a2.5 2.5 0 0 1 5 0a.5.5 0 0 1-1 0A1.5 1.5 0 0 0 8 2.5ZM4.5 7a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-7Z"/></svg>
            {/if}
        </button>

        <button>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm0 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm-1 3a1 1 0 1 0 2 0a1 1 0 0 0-2 0Z"/></svg>
        </button>
    </div>
</div>

<style>
	.tab-list {
		/* border-bottom: 1px solid #232323; */
        display: flex;
        background: #282828;
        height: 24px;
        border-right: 2px solid #202020;
	}

    .pane-control {
        border-bottom: 1px solid #232323;
        width: 100%;
        display: flex;
        padding-right: 7px;
        padding-top: 2px;
        justify-content: flex-end;
        min-width: 50px;
    }

    .pane-control svg {
        width: 16px;
        height: 16px;
        padding: 2px;
        color: #C4C4C4;
    }

    .pane-control button {
        height: 20px;

    }

    .pane-control button:hover {
        background: #505050;
        color: #F0F0F0;
    }

    button {
        background: transparent;
        margin: 0;
        padding: 0;
        border: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: default;
        overflow-x: hidden;
        overflow: hidden;
    }

</style>