<script lang="ts">
    import { currentScene, inspectedGameObject, reducible } from "../store/game";

    import { onMount, onDestroy } from 'svelte';
    import { selectedGameObjectId } from "../store/editor";
    import { resetGameObjectTint, tintGameObject } from "../helpers/gameObject";

    let subscription;

    let scene;

    let anims = [];
    let cameras = [];
    let children = [];
    let sceneEvents = [];
    let lights = [];
    let physics = {};
    let player = {};

    /*
registry
sound
textures
events
cameras
children
lights
data
input
time
tweens
physics
scale
plugins
renderer
    */

    subscription = currentScene.subscribe(value => {
            console.log(value);

            if (value) {
                scene = value;

                if (value.cameras && value.cameras.cameras) {
                    cameras = Object.values(value.cameras.cameras);
                }

                if (value.children && value.children.list) {
                    children = Object.values(value.children.list);
                }

                if (value.events && value.events._events) {
                    sceneEvents = Object.keys(value.events._events)
                }

                if (value.lights && value.lights.lights) {
                    lights = Object.values(value.lights.lights)
                }

                if (value.physics && value.physics.config) {
                    physics = value.physics.config
                }

                if (value.player) {
                    player = value.player
                }
            }
            
            
        });

    onDestroy(subscription)

    // onMount(async () => {
        
    // })

    // onDestroy(async () => {
    //     console.error(subscription);
    // })

    let tintMemo;

    const selectGameObject = (index, gameObject) => {

        let objectName = `${gameObject.type}_${index}`

        let prev = $inspectedGameObject;
        if (prev) {
            resetGameObjectTint(prev, tintMemo);
        }

        if (objectName !== $selectedGameObjectId) {
            // GameObject Selection behaviour 
            
            tintMemo = tintGameObject(gameObject)

            selectedGameObjectId.set(objectName)
            inspectedGameObject.set(gameObject);
        } else {
            // GameObject de-select behaviour

            selectedGameObjectId.set('');
            inspectedGameObject.set(undefined);
        }
    }

    
</script>

<div class="panel">
    <div class="header">
        <div class="toolbar">
            <button class="add-btn">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75Z"/></svg>
                
                <button class="dropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.797 7a1 1 0 0 0-.778 1.628l3.814 4.723a1.5 1.5 0 0 0 2.334 0l3.815-4.723A1 1 0 0 0 14.204 7H5.797Z"/></svg>
                </button>
            </button>

            <input type="text" placeholder="All"/>

        </div>
    
    </div>

    <div class="container">
        {#each cameras as camera, i}
            <div class="item"
                class:selected="{$selectedGameObjectId === `${camera.type}_${i}`}"

                on:click="{() => {
                    selectGameObject(i, camera)
                }}"
            >
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M3 6a3 3 0 0 1 3-3h1.5a.5.5 0 0 1 0 1H6a2 2 0 0 0-2 2v1.5a.5.5 0 0 1-1 0V6Zm9-2.5a.5.5 0 0 1 .5-.5H14a3 3 0 0 1 3 3v1.5a.5.5 0 0 1-1 0V6a2 2 0 0 0-2-2h-1.5a.5.5 0 0 1-.5-.5ZM3.5 12a.5.5 0 0 1 .5.5V14a2 2 0 0 0 2 2h1.5a.5.5 0 0 1 0 1H6a3 3 0 0 1-3-3v-1.5a.5.5 0 0 1 .5-.5Zm13 0a.5.5 0 0 1 .5.5V14a3 3 0 0 1-3 3h-1.5a.5.5 0 0 1 0-1H14a2 2 0 0 0 2-2v-1.5a.5.5 0 0 1 .5-.5ZM10 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-4 1V9a1 1 0 0 1 1-1h1l.703-1.055a1 1 0 0 1 .832-.445h.93a1 1 0 0 1 .832.445L12 8h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Zm6-2a2 2 0 1 0-4 0a2 2 0 0 0 4 0Z"/></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5 5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1.029l2.841 1.847A.75.75 0 0 0 17 13.19V6.811a.75.75 0 0 0-1.16-.629L13 8.032V7a2 2 0 0 0-2-2H5Zm8 4.224l3-1.952v5.457l-3-1.95V9.224ZM12 7v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1ZM6.892 2.03a7.067 7.067 0 0 0-.85.37a4.67 4.67 0 0 0-.292.166l-.018.012l-.006.004l-.002.001l-.001.001L6 3l-.277-.416a.5.5 0 0 0 .554.833l.007-.005l.041-.025c.038-.023.099-.058.18-.1c.162-.085.407-.2.728-.317A8.105 8.105 0 0 1 10 2.5c1.183 0 2.125.236 2.767.47c.32.117.566.232.728.317a3.69 3.69 0 0 1 .22.125l.008.004l.262-.393l-.262.393a.5.5 0 1 0 .554-.832L14 3l.277-.416l-.001-.001l-.002-.001l-.006-.004l-.019-.012a4.665 4.665 0 0 0-.292-.166a7.063 7.063 0 0 0-.849-.37A9.104 9.104 0 0 0 10 1.5a9.104 9.104 0 0 0-3.108.53Zm-.615 1.387c-.001 0 0 0 0 0Zm7.446 0ZM6.892 17.97c.733.267 1.79.53 3.108.53a9.104 9.104 0 0 0 3.108-.53c.367-.133.653-.268.85-.37a4.626 4.626 0 0 0 .291-.166l.019-.012l.006-.004l.002-.001s.001-.001-.276-.417l.277.416a.5.5 0 0 0-.554-.832l.262.393l-.262-.393l-.008.005a3.67 3.67 0 0 1-.22.125a6.05 6.05 0 0 1-.728.316A8.106 8.106 0 0 1 10 17.5a8.106 8.106 0 0 1-2.767-.47a6.075 6.075 0 0 1-.728-.317a3.663 3.663 0 0 1-.22-.125l-.008-.005a.5.5 0 0 0-.554.833L6 17l-.277.416l.001.001l.002.001l.006.004l.018.012l.063.038a7.063 7.063 0 0 0 1.078.497Zm-.615-1.386c-.001 0 0 0 0 0Zm7.446 0Z"/></svg>

                <span>{camera.name || "Untitled Camera"}</span>
            </div>
        {/each}

        {#each children as child, i}
            <div class="item"
                class:selected="{$selectedGameObjectId === `${child.type}_${i}`}"

                on:click="{() => {
                    selectGameObject(i, child)
                }}"
            >
                <button class="act" on:click="{(e) => console.log(child)}">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.703 6.042a.5.5 0 1 0-.406.914L9.5 8.824V13.5a.5.5 0 0 0 1 0V8.824l4.203-1.868a.5.5 0 1 0-.406-.914L10 7.952l-4.297-1.91ZM11.3 2.481a3.5 3.5 0 0 0-2.6 0L2.943 4.784A1.5 1.5 0 0 0 2 6.176v7.646a1.5 1.5 0 0 0 .943 1.393L8.7 17.518a3.5 3.5 0 0 0 2.6 0l5.757-2.303A1.5 1.5 0 0 0 18 13.822V6.176a1.5 1.5 0 0 0-.943-1.392L11.3 2.48Zm-2.228.928a2.5 2.5 0 0 1 1.857 0l5.757 2.303a.5.5 0 0 1 .314.464v7.646a.5.5 0 0 1-.314.465l-5.758 2.303a2.5 2.5 0 0 1-1.856 0l-5.758-2.303A.5.5 0 0 1 3 13.822V6.176a.5.5 0 0 1 .314-.464L9.072 3.41Z"/></svg>
                </button>
                
                <span>{child.name || `Untitled ${child.type}`}</span>
            </div>
        {/each}

        {#if player}
            <div class="item"
                class:selected="{$selectedGameObjectId === `Player_0`}"

                on:click="{() => {
                    player.type = "Player"
                    player.name = "Player"
                    selectGameObject(0, player)
                }}"
            >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M6 7.5a.5.5 0 0 1 1 0V9h1.5a.5.5 0 0 1 0 1H7v1.5a.5.5 0 0 1-1 0V10H4.5a.5.5 0 0 1 0-1H6V7.5Zm9 .5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-3 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM2 9.5A5.5 5.5 0 0 1 7.5 4h5a5.5 5.5 0 1 1 0 11h-5A5.5 5.5 0 0 1 2 9.5ZM7.5 5a4.5 4.5 0 0 0 0 9h5a4.5 4.5 0 1 0 0-9h-5Z"/></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm-4.991 9A2.001 2.001 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18c1.855 0 3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2H5.009Z"/></svg> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0a3 3 0 0 1-6 0Zm-1.991 5A2.001 2.001 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18c1.855 0 3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2H5.009ZM4 13c0-.553.448-1 1.009-1H15a1 1 0 0 1 1 1c0 1.309-.622 2.284-1.673 2.953C13.257 16.636 11.735 17 10 17c-1.735 0-3.257-.364-4.327-1.047C4.623 15.283 4 14.31 4 13Z"/></svg> -->
                <span>Player</span>
            </div>
        {/if}

        {#if physics}
            <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10.755 6.426a1.998 1.998 0 1 1 2.825 2.827a1.998 1.998 0 0 1-2.825-2.827Zm2.118.708a.998.998 0 1 0-1.412 1.41a.998.998 0 0 0 1.412-1.41Zm-1.124 7.37a1.5 1.5 0 0 1-1.704-.295l-.61-.609l-.731 1.22a.5.5 0 0 1-.783.097l-2.83-2.831a.5.5 0 0 1 .096-.782l1.22-.732l-.61-.61a1.5 1.5 0 0 1-.294-1.703l-1.12-1.12a.5.5 0 0 1 0-.707l1.06-1.06a3.003 3.003 0 0 1 3.413-.589l.937-.937a6.295 6.295 0 0 1 6.33-1.557a2.432 2.432 0 0 1 1.595 1.595c.7 2.235.1 4.674-1.556 6.33l-.938.938a3.004 3.004 0 0 1-.589 3.413l-1.06 1.06a.5.5 0 0 1-.707 0l-1.12-1.12Zm4.076-11.26A5.294 5.294 0 0 0 10.5 4.553l-.815.815l.003.004l-.707.707l-.003-.004l-2.122 2.122l.003.004l-.402.403a.5.5 0 0 0 .048.651l4.247 4.247a.5.5 0 0 0 .653.047l.401-.401l.004.004l2.122-2.122l-.004-.004l.707-.707l.004.004l.815-.816a5.294 5.294 0 0 0 1.31-5.325a1.431 1.431 0 0 0-.94-.938Zm-3.308 10.615l.705.705l.706-.707a2.001 2.001 0 0 0 .52-1.93l-1.931 1.932Zm-4.438-8.3a2.001 2.001 0 0 0-1.929.52l-.706.707l.705.704l1.93-1.93Zm.628 7.312l-1.57-1.57l-.886.53l1.925 1.926l.53-.886Zm-2.905 2.04a.5.5 0 1 0-.707-.706l-1.768 1.768a.5.5 0 1 0 .707.707l1.768-1.768ZM4.387 12.79a.5.5 0 0 1 0 .707l-.709.709a.5.5 0 0 1-.707-.708l.709-.708a.5.5 0 0 1 .707 0Zm2.83 3.537a.5.5 0 0 0-.706-.707l-.71.709a.5.5 0 1 0 .708.707l.709-.709Z"/></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M14.6 7.38a.5.5 0 0 0 0-.707L13.327 5.4a.5.5 0 1 0-.707.707l1.273 1.273a.5.5 0 0 0 .707 0Zm-6.79 6.081a.5.5 0 1 1-.707.707l-1.272-1.272a.5.5 0 1 1 .707-.708l1.272 1.273Zm9.36-10.614a1.466 1.466 0 0 0-2.073 0l-.62.62l-.245-.244a1.848 1.848 0 0 0-2.844.28a2.273 2.273 0 0 0-2.09 3.828l.658.657l-1.969 1.969l-.658-.658a2.273 2.273 0 0 0-3.828 2.09a1.851 1.851 0 0 0-.28 2.844l.245.245l-.637.637a1.466 1.466 0 0 0 2.073 2.074l.638-.638l.244.244a1.848 1.848 0 0 0 2.844-.28a2.273 2.273 0 0 0 2.09-3.828l-.658-.657l1.969-1.968l.658.657a2.273 2.273 0 0 0 3.827-2.09a1.851 1.851 0 0 0 .28-2.844l-.245-.244l.62-.62a1.466 1.466 0 0 0 0-2.074Zm-1.328 1.987l-.659-.66l.62-.62a.466.466 0 0 1 .66.66l-.62.62Zm-4.52 4.52l-1.969 1.969l-.659-.659l1.969-1.968l.659.658Zm-6.49 6.49l-.637.637a.466.466 0 0 1-.66-.659l.639-.637l.658.659ZM12.326 3.93a.848.848 0 0 1 1.2 0l2.562 2.562a.848.848 0 0 1-.336 1.407a.5.5 0 0 0-.3.683a1.273 1.273 0 0 1-2.057 1.43l-3.39-3.389a1.273 1.273 0 0 1 1.43-2.057a.5.5 0 0 0 .684-.3a.842.842 0 0 1 .207-.336Zm-7.503 6.076a1.273 1.273 0 0 1 1.8 0l3.389 3.389a1.273 1.273 0 0 1-1.43 2.057a.5.5 0 0 0-.684.3a.848.848 0 0 1-1.406.336L3.93 13.526a.848.848 0 0 1 .336-1.406a.5.5 0 0 0 .3-.684a1.273 1.273 0 0 1 .257-1.43Z"/></svg> -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M7.453 7.272a.5.5 0 0 1 .909.038l2.35 5.759c.485 1.188 2.142 1.258 2.725.114l1.23-2.41a.5.5 0 0 1 .446-.273h.972a1.5 1.5 0 1 0 0-1h-.973a1.5 1.5 0 0 0-1.336.818l-1.23 2.411a.5.5 0 0 1-.908-.038l-2.35-5.759c-.485-1.188-2.142-1.258-2.725-.115l-1.23 2.41a.5.5 0 0 1-.445.273h-.973a1.5 1.5 0 1 0 0 1h.973a1.5 1.5 0 0 0 1.336-.818l1.23-2.41Z"/></svg> -->
                <span>Physics</span>
            </div>
        {/if}

        <!--
        Perosn
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm-4.991 9A2.001 2.001 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18c1.855 0 3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2H5.009Z"/></svg>

        Camera
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5 5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1.029l2.841 1.847A.75.75 0 0 0 17 13.19V6.811a.75.75 0 0 0-1.16-.629L13 8.032V7a2 2 0 0 0-2-2H5Zm8 4.224l3-1.952v5.457l-3-1.95V9.224ZM12 7v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1ZM6.892 2.03a7.067 7.067 0 0 0-.85.37a4.67 4.67 0 0 0-.292.166l-.018.012l-.006.004l-.002.001l-.001.001L6 3l-.277-.416a.5.5 0 0 0 .554.833l.007-.005l.041-.025c.038-.023.099-.058.18-.1c.162-.085.407-.2.728-.317A8.105 8.105 0 0 1 10 2.5c1.183 0 2.125.236 2.767.47c.32.117.566.232.728.317a3.69 3.69 0 0 1 .22.125l.008.004l.262-.393l-.262.393a.5.5 0 1 0 .554-.832L14 3l.277-.416l-.001-.001l-.002-.001l-.006-.004l-.019-.012a4.665 4.665 0 0 0-.292-.166a7.063 7.063 0 0 0-.849-.37A9.104 9.104 0 0 0 10 1.5a9.104 9.104 0 0 0-3.108.53Zm-.615 1.387c-.001 0 0 0 0 0Zm7.446 0ZM6.892 17.97c.733.267 1.79.53 3.108.53a9.104 9.104 0 0 0 3.108-.53c.367-.133.653-.268.85-.37a4.626 4.626 0 0 0 .291-.166l.019-.012l.006-.004l.002-.001s.001-.001-.276-.417l.277.416a.5.5 0 0 0-.554-.832l.262.393l-.262-.393l-.008.005a3.67 3.67 0 0 1-.22.125a6.05 6.05 0 0 1-.728.316A8.106 8.106 0 0 1 10 17.5a8.106 8.106 0 0 1-2.767-.47a6.075 6.075 0 0 1-.728-.317a3.663 3.663 0 0 1-.22-.125l-.008-.005a.5.5 0 0 0-.554.833L6 17l-.277.416l.001.001l.002.001l.006.004l.018.012l.063.038a7.063 7.063 0 0 0 1.078.497Zm-.615-1.386c-.001 0 0 0 0 0Zm7.446 0Z"/></svg>

        IA cool
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M6.13 2.793A3.91 3.91 0 0 1 8.5 2a1.757 1.757 0 0 1 1.5.78A1.757 1.757 0 0 1 11.5 2a3.91 3.91 0 0 1 2.37.793c.525.408.93.973 1.073 1.656c.328.025.628.161.88.366c.382.31.66.775.835 1.267c.274.765.348 1.74.064 2.57c.072.034.143.074.212.12c.275.183.484.445.638.754c.303.605.428 1.449.428 2.474c0 1.141-.435 1.907-.987 2.38a2.68 2.68 0 0 1-1.054.555c-.1.558-.38 1.204-.819 1.752c-.57.715-1.454 1.313-2.64 1.313c-.94 0-1.688-.52-2.174-1.03a4.252 4.252 0 0 1-.326-.385a4.245 4.245 0 0 1-.326.385C9.188 17.48 8.441 18 7.5 18c-1.186 0-2.069-.598-2.64-1.313a4.057 4.057 0 0 1-.819-1.752a2.68 2.68 0 0 1-1.054-.555C2.435 13.907 2 13.14 2 12c0-1.025.126-1.87.428-2.474a1.92 1.92 0 0 1 .638-.755a1.58 1.58 0 0 1 .212-.118c-.284-.832-.21-1.806.064-2.571c.175-.492.453-.957.835-1.267c.252-.205.552-.34.88-.366c.144-.683.549-1.248 1.074-1.656ZM9.5 4.5v-.01l-.002-.05a2.744 2.744 0 0 0-.154-.764a1.222 1.222 0 0 0-.309-.49A.76.76 0 0 0 8.5 3a2.91 2.91 0 0 0-1.756.582C6.28 3.943 6 4.432 6 5a.5.5 0 0 1-.658.474c-.188-.062-.356-.027-.535.117c-.196.16-.387.444-.524.827c-.279.782-.25 1.729.133 2.305A.5.5 0 0 1 4.5 9h.75a2.25 2.25 0 0 1 2.25 2.25v.335a1.5 1.5 0 1 1-1 0v-.335c0-.69-.56-1.25-1.25-1.25H3.5a.499.499 0 0 1-.175-.032l-.003.006C3.124 10.369 3 11.025 3 12c0 .859.315 1.343.638 1.62c.347.298.732.38.862.38a.5.5 0 0 1 .5.5c0 .368.2 1.011.64 1.563c.429.535 1.046.937 1.86.937c.56 0 1.062-.313 1.45-.72c.191-.2.34-.407.437-.577a1.573 1.573 0 0 0 .113-.236V7.5H8.415a1.5 1.5 0 1 1 0-1H9.5v-2Zm1 9.999v.967a1.575 1.575 0 0 0 .113.236c.098.17.246.377.436.577c.389.407.892.72 1.451.72c.814 0 1.431-.402 1.86-.937c.44-.552.64-1.195.64-1.563a.5.5 0 0 1 .5-.5c.13 0 .515-.082.862-.38c.323-.277.638-.761.638-1.62c0-.975-.125-1.63-.322-2.026a.923.923 0 0 0-.3-.37A.657.657 0 0 0 16 9.5a.5.5 0 0 1-.416-.777c.384-.576.412-1.523.133-2.305c-.137-.383-.328-.668-.524-.827c-.179-.144-.347-.18-.535-.117A.5.5 0 0 1 14 5c0-.568-.28-1.057-.745-1.418A2.91 2.91 0 0 0 11.5 3a.76.76 0 0 0-.535.186a1.22 1.22 0 0 0-.31.49a2.579 2.579 0 0 0-.155.814v9.01h.75c.69 0 1.25-.56 1.25-1.25v-1.835a1.5 1.5 0 1 1 1 0v1.835a2.25 2.25 0 0 1-2.25 2.25h-.75ZM6.5 7a.5.5 0 1 0 1 0a.5.5 0 0 0-1 0ZM13 9.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm-6 3a.5.5 0 1 0 0 1a.5.5 0 0 0 0-1Z"/></svg>

        IA 
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M12 5.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm-5 1a1 1 0 1 1 2 0a1 1 0 0 1-2 0Zm3.5-4a.5.5 0 0 0-1 0V3h-3A1.5 1.5 0 0 0 5 4.5v4A1.5 1.5 0 0 0 6.5 10h7A1.5 1.5 0 0 0 15 8.5v-4A1.5 1.5 0 0 0 13.5 3h-3v-.5ZM6.5 4h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm3.75 13.998c2.616-.033 4.195-.595 5.122-1.44c.875-.8 1.089-1.777 1.123-2.556h.005v-.69a1.81 1.81 0 0 0-1.81-1.809H11.5V11.5h-3v.003H5.31c-1 0-1.81.81-1.81 1.81v.689h.005c.034.78.248 1.757 1.123 2.555c.927.846 2.506 1.408 5.122 1.441V18h.5v-.002Zm-4.94-5.495h9.38a.81.81 0 0 1 .81.81v.437c0 .69-.131 1.456-.802 2.069C14.01 16.446 12.66 17 10 17c-2.66 0-4.01-.554-4.698-1.181c-.67-.613-.802-1.38-.802-2.069v-.438a.81.81 0 0 1 .81-.809Z"/></svg>
        
        Pawn
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 3a1 1 0 0 1 1-1h.5c.385 0 .737.145 1.002.384A1.494 1.494 0 0 1 13.505 2h.99c.385 0 .737.145 1.003.384A1.494 1.494 0 0 1 16.5 2h.5a1 1 0 0 1 1 1v2.5a2.5 2.5 0 0 1-1.95 2.44c.284 4.043 1.7 6.585 2.187 7.35c.16.252.263.553.263.877v.333A1.5 1.5 0 0 1 17 18h-5.476a2.44 2.44 0 0 0 .435-1H17a.5.5 0 0 0 .5-.5v-.333a.637.637 0 0 0-.107-.34c-.573-.9-2.155-3.774-2.369-8.304A.5.5 0 0 1 15.518 7A1.5 1.5 0 0 0 17 5.5V3h-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 1-1 .003V4.5l-.005-1.002a.5.5 0 0 0-.5-.498h-.99a.5.5 0 0 0-.5.498L13 4.502a.5.5 0 0 1-1-.003v-1a.5.5 0 0 0-.5-.5H11v2.5A1.5 1.5 0 0 0 12.482 7a.5.5 0 0 1 .494.523c-.158 3.34-1.06 5.779-1.752 7.191a2.817 2.817 0 0 0-.203-.188a4.192 4.192 0 0 1-.55-.558c.588-1.278 1.288-3.315 1.479-6.029A2.505 2.505 0 0 1 10 5.5V3ZM4.5 8a2 2 0 1 1 3.6 1.2a.5.5 0 0 0 .4.8H9a.5.5 0 0 1 0 1H7.893a.5.5 0 0 0-.496.56c.302 2.47 1.609 3.888 2.34 4.5c.175.146.263.33.263.489a.451.451 0 0 1-.451.451H3.45a.451.451 0 0 1-.45-.451c0-.16.088-.343.262-.489c.732-.612 2.04-2.03 2.341-4.5a.5.5 0 0 0-.496-.56H4a.5.5 0 0 1 0-1h.5a.5.5 0 0 0 .4-.8A1.989 1.989 0 0 1 4.5 8Zm2-3a3 3 0 0 0-2.817 4.034A1.5 1.5 0 0 0 4 12h.52c-.372 1.798-1.353 2.836-1.9 3.293c-.346.29-.62.736-.62 1.256C2 17.35 2.65 18 3.451 18H9.55c.8 0 1.45-.65 1.45-1.451c0-.52-.274-.966-.62-1.256c-.547-.457-1.528-1.495-1.9-3.293H9a1.5 1.5 0 0 0 .317-2.966A3 3 0 0 0 6.5 5Z"/></svg>

        Animator
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M3 5.5a.5.5 0 0 1 .5-.5h1.653c1 0 1.952.428 2.616 1.175l2.21 2.486a2.5 2.5 0 0 0 1.868.839h4.446l-3.647-3.646a.5.5 0 0 1 .708-.708l4.5 4.5a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708l3.647-3.646h-4.446a2.5 2.5 0 0 0-1.868.84l-2.21 2.485A3.5 3.5 0 0 1 5.153 15H3.5a.5.5 0 0 1 0-1h1.653a2.5 2.5 0 0 0 1.868-.84l2.21-2.485c.238-.268.513-.494.813-.675c-.3-.18-.575-.407-.813-.675L7.021 6.84A2.5 2.5 0 0 0 5.153 6H3.5a.5.5 0 0 1-.5-.5Z"/></svg>


        -->

        <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.096 5.089 5.605 4 8 4s3.904 1.089 4.802 2.183a6.7 6.7 0 0 1 1.117 1.982a4.077 4.077 0 0 1 .06.187l.003.013v.004l.001.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.872 4.872 0 0 0-.2-.52a5.696 5.696 0 0 0-.78-1.263C11.286 5.912 10.044 5 8 5c-2.044 0-3.285.912-4.028 1.817a5.7 5.7 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025ZM5.5 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.096 5.089 5.605 4 8 4s3.904 1.089 4.802 2.183a6.7 6.7 0 0 1 1.117 1.982a4.077 4.077 0 0 1 .06.187l.003.013v.004l.001.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.872 4.872 0 0 0-.2-.52a5.696 5.696 0 0 0-.78-1.263C11.286 5.912 10.044 5 8 5c-2.044 0-3.285.912-4.028 1.817a5.7 5.7 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025ZM8 7a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM6.5 9.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A5.987 5.987 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a4.94 4.94 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446Zm-.74-.74A1.5 1.5 0 1 1 7.413 8.12l1.969 1.968ZM6.32 4.2l.854.854C7.434 5.019 7.709 5 8 5c2.044 0 3.286.912 4.028 1.817a5.695 5.695 0 0 1 .945 1.674c.017.048.028.085.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2.3 2.3 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.088 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199Z"/></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708L12.707 6L9.998 3.294l.734-.734Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632L5.4 13.06c.243-.08.463-.217.644-.398L12 6.708L9.292 4.001Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632l2.743-.914c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.708Zm-2 .708a.914.914 0 1 1 1.293 1.292L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.156l-1.794.598l.598-1.793a.649.649 0 0 1 .156-.254L10 4.708Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m9 9.707l5.146 5.147a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708L6.293 7L3.338 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632l2.743-.914c.243-.08.463-.217.644-.398L9 9.707ZM8.293 9l-2.955 2.955a.648.648 0 0 1-.253.156l-1.794.598l.598-1.793a.649.649 0 0 1 .156-.254L7 7.707L8.293 9Zm3-2.999L9.706 7.586l.707.707l3.026-3.025a1.914 1.914 0 0 0-2.707-2.708L7.707 5.586l.707.707L10 4.708l1.293 1.293Zm.147-2.733a.914.914 0 1 1 1.293 1.292L12 5.294l-1.293-1.293l.734-.733Z"/></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M4.697 5.04a.5.5 0 0 0-.394.919L7.5 7.329v3.17a.5.5 0 0 0 1 0V7.33l3.197-1.37a.5.5 0 1 0-.394-.92L8 6.456L4.697 5.04Zm4.38-3.662a3 3 0 0 0-2.154 0L1.962 3.286A1.5 1.5 0 0 0 1 4.686v6.626a1.5 1.5 0 0 0 .962 1.4l4.961 1.909a3 3 0 0 0 2.154 0l4.962-1.909a1.5 1.5 0 0 0 .961-1.4V4.686a1.5 1.5 0 0 0-.961-1.4L9.077 1.378Zm-1.795.933a2 2 0 0 1 1.436 0l4.962 1.908a.5.5 0 0 1 .32.467v6.626a.5.5 0 0 1-.32.467l-4.962 1.908a2 2 0 0 1-1.436 0L2.321 11.78A.5.5 0 0 1 2 11.312V4.686a.5.5 0 0 1 .32-.467l4.962-1.908Z"/></svg> -->
    </div>

</div>

<style>
    .panel {
        background: #202020;
        padding-right: 2px;
        height: 100%;
        overflow-y: auto;

        display: flex;
        flex-direction: column;
    }

    .header {
        border-bottom: 1px solid #232323;
    }

    .container {
        display: flex;
        flex-direction: column;
        overflow: auto;
        background: #383838;
        color: #B4B4B4;
    }

    .item:hover {
        background: #444444;
    }

    .item {
        display: flex;
        flex-direction: row;
        padding-left: 20px;
    }

    .item.selected {
        background: #2C5D87;
    }

    .item svg {
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 0;
        color: #C2C2C2;
    }

    .item > span {
        line-height: 20px;
        font-stretch: semi-condensed;
        font-size: 15px;
        padding-left: 4px;
        color: #D0D0D0;
    }

    .act {
        border: 0;
        margin: 0;
        background: transparent;
    }

    .item > button {
        height: 20px;
    }

    .item > button:hover {
        cursor: pointer;
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

    .toolbar {
       background: #3C3C3C;
       display: flex;
       gap: 8px;
       padding-left: 2px;
    }

    input {
        margin: 2px 4px;
        background: #2A2A2A;
        border: 1px solid #202020;
        border-top: 1px solid #0D0D0D;
        border-radius: .375rem;
    }

    .add-btn {
        display: flex;
        padding: 2px;
    }

    .add-btn:hover {
        background: #464646;
    }

    .add-btn > svg {
        width: 20px;
        height: 20px;
    }

    .add-btn .dropdown,
    .add-btn .dropdown svg {
        height: 100%;
    }
</style>