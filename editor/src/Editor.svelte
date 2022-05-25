<script>
    import './global.css'

    export let game = null;

    import { onMount } from "svelte";
    
    import HierarchyPanel from "./panels/HierarchyPanel.svelte";

    import TopBar from "./TopBar.svelte";

    import { Tabs, TabList, TabPanel, Tab } from './components/tabs';

    import SkeletonPanel from "./panels/SkeletonPanel.svelte";

    import { currentScene } from './store/game';
import InspectorPanel from "./panels/InspectorPanel.svelte";

    let states = [];

    let prevEvent;
    let nextEvent;

    let currentSpine;

	onMount(() => {
        window.addEventListener('engine_debug', (e) => {
            
            if (e.detail.name && e.detail.name === 'AnimGraph') {
                // console.log(e.detail.name);

                states = [...Object.keys(e.detail.states)];

                prevEvent = e.detail.current;
                nextEvent = e.detail.newState;
            }
        })

        window.addEventListener('engine_ready', (e) => {

            game = window.game
            
            // gameRef.loop.sleep();

            let gameDiv = document.querySelector("#game")
            let width = gameDiv.offsetWidth;
            let height = gameDiv.offsetHeight;

            let gameCanvas = document.querySelector("#game canvas")
            // TODO : max by ration 1200 / 900
            // gameCanvas.style.width = width
            gameCanvas.style.height = `${height-4}px`

            // OKAY THIS IS EPIC
            // I can work with the GameApp instance right here !!

            // TODO: use game.step 
            console.log(game)

            class ReadyEventHandler {
                handler (...data) {
                    console.log(data);
                }

                handler_ready (...data) {
                    // console.log(window.game.scene);

                    // window.game.scene.bootScene(window.game.scene.scenes[0])

                    console.log(data);
                }
                
                handler_boot (...data) {
                    console.log(data);
                }

                handler_start (...data) {
                    console.log(data);
                }

                handler_spine (scene, spine) {
                    console.log(scene);
                    console.log(spine);

                    if (spine.constructor.name === "Player") {
                        currentSpine = spine;
                    }
                    
                }

                handler_loadScene (name, scene) {
                    currentScene.set(scene);
                    console.log(name);
                    console.log(scene);
                }
            }

            // Events:
            // boot, start, resume, destroy, pause, ready, render, shutdown, sleep
            // extra cool : addedtoscene, postupdate, prerender, update, wake
            let handl = new ReadyEventHandler();

            game.events.on('ready', handl.handler_ready, handl);
            game.events.on("boot", handl.handler_boot, handl);
            game.events.on("start", handl.handler_start, handl);
            game.events.on('createdSpineObject', handl.handler_spine, handl);
            game.events.on('loadScene', handl.handler_loadScene, handl);

            // game.loop.sleep()
            // game.loop.wake()

        })
	});

</script>

<TopBar gameRef={game} />

<div class="left-pane">

    <Tabs>
        <TabList>
            <Tab name="Skeleton">
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 4.5A1.75 1.75 0 1 0 8 1a1.75 1.75 0 0 0 0 3.5ZM4.198 3.115a1.6 1.6 0 0 0-2.076.873a1.58 1.58 0 0 0 .87 2.07l1.695.685A.5.5 0 0 1 5 7.206V9.13a.5.5 0 0 1-.058.234l-1.755 3.3a1.591 1.591 0 1 0 2.81 1.495l1.783-3.353a.25.25 0 0 1 .441 0l1.783 3.353a1.591 1.591 0 1 0 2.81-1.494L11.06 9.362a.5.5 0 0 1-.06-.235v-1.92a.5.5 0 0 1 .313-.464l1.695-.685a1.58 1.58 0 0 0 .87-2.07a1.6 1.6 0 0 0-2.076-.873l-.781.316c-.256.103-.44.3-.545.518a2.75 2.75 0 0 1-4.952 0a1.046 1.046 0 0 0-.545-.518l-.78-.316Z"/></svg>
            </Tab>

            <Tab name="Hierarchy">
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16px" height="16px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM2 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm5 3.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM5.5 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM5 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 5 8Zm4.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z"/></svg>
            </Tab>

            <Tab name="Inpsector">
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="16px" height="16px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm.75 3.5a.749.749 0 1 1-1.499 0a.749.749 0 0 1 1.498 0ZM8 7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 7Z"/></svg>
            </Tab>
            
            
        </TabList>

        <TabPanel>
            <SkeletonPanel bind:player={currentSpine} />
        </TabPanel>

        <TabPanel>
            <HierarchyPanel />
        </TabPanel>

        <TabPanel>
            <InspectorPanel />
        </TabPanel>

        
    </Tabs>

    
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
        /* position: fixed; */
        /* left: 0; */
        width: 360px;
        overflow-y: auto;
        
    }

    :global(#editor) {
        height: 100%;
        display: grid;
        grid-template-rows: 38px auto 0;
        grid-template-columns: 360px auto;
    }

    :global(#game canvas) {
        height: 650px;
        width: auto;
    }
</style>