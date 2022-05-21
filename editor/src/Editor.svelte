<script>
    export let game = null;

    import { onMount } from "svelte";
import HierarchyPanel from "./panels/HierarchyPanel.svelte";
    import TopBar from "./TopBar.svelte";


    let states = [];

    let prevEvent;
    let nextEvent;

	onMount(() => {
        console.log(game);

        window.addEventListener('engine_debug', (e) => {
            
            if (e.detail.name && e.detail.name === 'AnimGraph') {
                console.log(e.detail.name);

                states = [...Object.keys(e.detail.states)];

                prevEvent = e.detail.current;
                nextEvent = e.detail.newState;
            }
        })

        window.addEventListener('engine_ready', (e) => {
            game = window.game
            
            gameRef.loop.sleep();

            // OKAY THIS IS EPIC
            // I can work with the GameApp instance right here !!

            // TODO: use game.step 
            console.log(game)

            // game.loop.sleep()
            // game.loop.wake()

        })
	});

</script>

<TopBar gameRef={game} />

<div class="left-pane">
    <HierarchyPanel />
</div>

<div class="anims">
    {#each states as state, index }
        <div
            class="animCard"
            class:prev="{state === prevEvent}"
            class:next="{state === nextEvent}"
        >
            {state}
            <span></span>
        </div>
    {/each}
</div>

<style>
    p {
        color: aqua;
    }

    .anims {
        position: absolute;
        top: 58px;
        right: 8px;
        display: flex;
        gap: 8px;
    }

    .animCard {
        display: flex;
        flex-direction: column;
        background: linear-gradient(360deg, #4e5155, #45484a);
        padding: 4px 8px;
        border-radius: 4px;
        border-top: 2px solid #686b6e;
        box-shadow: 0px 2px 2px rgba(0,0,0,0.2);
        /* padding-bottom: 10px; */
    }

    .animCard span {
        margin-top: 4px;
        margin-bottom: 0px;
        width: auto;
        background-color: transparent;
        border-radius: 2px;
        height: 6px;
    }

    .animCard.next span {
        background-color: #368DCA;
    }

    .animCard.prev span {
        background-color: #2D2E30;
    }

    .left-pane {
        position: fixed;
        left: 0;
        
    }
</style>