<script>
    import { onMount } from "svelte";   

    export let player;

    // console.log(
    //   'Hookable Slots: ',
    //   this.getSlots().forEach((element: player.Slot, index, array) => {
    //     if (element.data.attachmentName !== null) {
    //       console.log(element.data.attachmentName)
    //     }
    //   })
    // )

    // console.log('Attachments: ', this.getAttachments())
    // console.log('Slots: ', this.getSlots())

    // $: hookable = (player && player.getSlots().forEach((element, index, array) => {
    //     if (element.data.attachmentName !== null) {
    //         return element
    //     }
    // })) || []

    $: attachments = (player && Object.values(player.getAttachments())) || []
    $: slots = (player && player.getSlots()) || []

    $: states = (player && player.states) || {initialState:'', possibleStates: [], state: ''};

    $: animations = (player && player.spine && player.spine.skeletonData && Object.values(player.spine.skeletonData.animations)) || []
    $: events = (player && player.spine && player.spine.skeletonData && Object.values(player.spine.skeletonData.events)) || []
    $: ikConstraints = (player && player.spine && player.spine.skeletonData && Object.values(player.spine.skeletonData.ikConstraints)) || []
    $: skins = (player && player.spine && player.spine.skeletonData && Object.values(player.spine.skeletonData.skins)) || []


    // TODO: slots and setAttachment('Slot_Sniper', 'Sniper_02')
    // player.spine.skeleton.data.defaultSkin.attachments  and  player.spine.skeleton.skin.attachments
    
    // $: itemSlot = (player && player.spine && player.spine.skeleton &&
    //     player.spine.skeleton.slots.filter(e => e.attachment !== null).map(e => [e.attachment.name, e.data.name])

    let currentSkin = '';
    
    class SpineEventHandler {
        handler (name, ref) {
            currentSkin = name;
            player = ref;
            // console.log(ref);
        }
    }

    let spineEvHndl = new SpineEventHandler();

    const setSkin = (name) => {
        if (player && player.spine && player.spine.emit) {
            player.spine.emit('loadSpineSkin', name);
            player.spine.once('changedSkin', spineEvHndl.handler, spineEvHndl);
        }
    }

    let debugging = true;
    let debugPaneOpen = false;

    let dbg_drawBones = true;
    let dbg_drawDebug = true;
    let dbg_drawRegionAttachments = false;
    let dbg_drawBoundingBoxes = false;
    let dbg_drawMeshHull = false;
    let dbg_drawMeshTriangles = false;
    let dbg_drawPaths = false;
    let dbg_drawSkeletonXY = false;
    let dbg_drawClipping = false;

    const toggleDebug = () => {
        debugging = !debugging;
        if (player && player.spine) {
            player.spine.drawBones = debugging && dbg_drawBones;
            player.spine.drawDebug = debugging && dbg_drawDebug;

            player.spine.drawRegionAttachments = debugging && dbg_drawRegionAttachments;
            player.spine.drawBoundingBoxes = debugging && dbg_drawBoundingBoxes;
            player.spine.drawMeshHull = debugging && dbg_drawMeshHull;
            player.spine.drawMeshTriangles = debugging && dbg_drawMeshTriangles;
            player.spine.drawPaths = debugging && dbg_drawPaths;
            player.spine.drawSkeletonXY = debugging && dbg_drawSkeletonXY;
            player.spine.drawClipping = debugging && dbg_drawClipping;
        }
    }

    const showDebugPane = () => {
        debugPaneOpen = !debugPaneOpen;
    }

    let scale = (player && player.spine && player.spine._scaleY) || 0.5;

    const changeScale = () => {
        if (player && player.spine) {
            player.spine._scaleX = -1 * scale;
            player.spine._scaleY = scale;
        }
    }

</script>

<div class="panel">
    <div class="header">
        <div class="toolbar">

            <button class="dbg-btn"
                on:click="{toggleDebug}"
            >
                {#if debugging}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2.5a.5.5 0 0 0-1 0V3c0 .397.116.767.315 1.078A3.001 3.001 0 0 0 6 7h-.5A1.5 1.5 0 0 1 4 5.5v-2a.5.5 0 0 0-1 0v2A2.5 2.5 0 0 0 5.5 8H6v1.5H2.5a.5.5 0 0 0 0 1H6V12h-.5A2.5 2.5 0 0 0 3 14.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 1 5.5 13H6a4 4 0 0 0 8 0h.5a1.5 1.5 0 0 1 1.5 1.5v2a.5.5 0 0 0 1 0v-2a2.5 2.5 0 0 0-2.5-2.5H14v-1.5h3.5a.5.5 0 0 0 0-1H14V8h.5A2.5 2.5 0 0 0 17 5.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 1 14.5 7H14a3.001 3.001 0 0 0-2.315-2.922c.2-.31.315-.68.315-1.078v-.5a.5.5 0 0 0-1 0V3a1 1 0 1 1-2 0v-.5Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M9 2.5a.5.5 0 0 0-1 0V3c0 .397.116.767.315 1.078A3.001 3.001 0 0 0 6 7h-.5A1.5 1.5 0 0 1 4 5.5v-2a.5.5 0 0 0-1 0v2A2.5 2.5 0 0 0 5.5 8H6v1.5H2.5a.5.5 0 0 0 0 1H6V12h-.5A2.5 2.5 0 0 0 3 14.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 1 5.5 13H6a4 4 0 0 0 8 0h.5a1.5 1.5 0 0 1 1.5 1.5v2a.5.5 0 0 0 1 0v-2a2.5 2.5 0 0 0-2.5-2.5H14v-1.5h3.5a.5.5 0 0 0 0-1H14V8h.5A2.5 2.5 0 0 0 17 5.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 1 14.5 7H14a3.001 3.001 0 0 0-2.315-2.922c.2-.31.315-.68.315-1.078v-.5a.5.5 0 0 0-1 0V3a1 1 0 1 1-2 0v-.5ZM13 7v6a3 3 0 1 1-6 0V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2Z"/></svg>
                {/if}

                <button class="dropdown"
                    on:click|stopPropagation="{showDebugPane}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.797 7a1 1 0 0 0-.778 1.628l3.814 4.723a1.5 1.5 0 0 0 2.334 0l3.815-4.723A1 1 0 0 0 14.204 7H5.797Z"/></svg>
                </button>
                
            </button>

            <div class="dropdown-menu" style="{debugPaneOpen ? 'display: block;' : ''}">
                <div class="menu-options">
                    <label>
                        <input type=checkbox bind:checked={dbg_drawBones}>
                        draw Bones
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawDebug}>
                        draw Debug
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawRegionAttachments}>
                        draw Region Attachments
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawBoundingBoxes}>
                        draw Bounding Boxes
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawMeshHull}>
                        draw Mesh Hull
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawMeshTriangles}>
                        draw Mesh Triangles
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawPaths}>
                        draw Paths
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawSkeletonXY}>
                        draw Skeleton XY
                    </label>

                    <label>
                        <input type=checkbox bind:checked={dbg_drawClipping}>
                        draw Clipping
                    </label>
        
                </div>
            </div>

            <div class="scale-input">
                <label>
                    <input bind:value={scale} type="number" min="0.1" max="4" step="0.1" id="speedPercent" on:change={changeScale}>:1
                </label>
            </div>
        </div>
    
    </div>

    <div class="container">
        <!-- {@debug slots} -->

        <div>States</div>
        {#each Object.entries(states.possibleStates) as [ name, state ] }
            
            <div class="item" class:active={name === states.state}>

                {#if name === states.state}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 5a3 3 0 0 1-2.145 2.876c.178.223.416.483.72.744c.726.622 1.834 1.252 3.425 1.363a3 3 0 1 1 .168 1.01c-1.96-.078-3.342-.841-4.243-1.613a6.62 6.62 0 0 1-.425-.398v3.06a3 3 0 1 1-1 0V7.958A3 3 0 1 1 10 5Z"/></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 5a3 3 0 0 1-2.145 2.876c.178.223.416.483.72.744c.726.622 1.834 1.252 3.425 1.363a3 3 0 1 1 .168 1.01c-1.96-.078-3.342-.841-4.243-1.613a6.62 6.62 0 0 1-.425-.398v3.06a3 3 0 1 1-1 0V7.958A3 3 0 1 1 10 5ZM7.009 7a2 2 0 1 0-.018-4a2 2 0 0 0 .018 4ZM17 10a2 2 0 1 0-4 0a2 2 0 0 0 4 0ZM7 17a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"/></svg>
                {/if}

                <span>{name}</span>
            </div>

        {/each}

        <div>Skins</div>
        {#each skins as {name, constraints, bones, attachments} }
            <div class="item" class:active={player.spine.skeleton && player.spine.skeleton.skin && name === player.spine.skeleton.skin.name}>

                {#if player.spine.skeleton && player.spine.skeleton.skin && name === player.spine.skeleton.skin.name}
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.77 3.166c2.373-1.454 5.173-1.59 7.927-.174c3.976 2.042 5.502 6.162 4.187 10.435c-.415 1.35-1.245 2.698-2.371 3.59c-1.14.902-2.604 1.347-4.206.799c-1.102-.377-1.79-.967-2.203-1.68c-.404-.696-.52-1.462-.574-2.132a25.653 25.653 0 0 1-.039-.586a19.7 19.7 0 0 0-.022-.369a4.724 4.724 0 0 0-.101-.76a1.163 1.163 0 0 0-.206-.466a.751.751 0 0 0-.386-.244c-.518-.159-.874-.126-1.156-.036c-.248.078-.447.2-.689.346c-.062.038-.127.078-.197.119c-.316.186-.72.396-1.238.37c-.514-.025-1.045-.275-1.656-.773c-.67-.546-.934-1.31-.938-2.112c-.003-.788.243-1.635.614-2.434c.737-1.59 2.043-3.15 3.254-3.893ZM9.75 6.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM15.5 9a1 1 0 1 0-2 0a1 1 0 0 0 2 0Zm-1 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-1 1a1 1 0 1 0-2 0a1 1 0 0 0 2 0Z"/></svg>
                {:else}
                    <button class="act" on:click="{() => setSkin(name)}">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M9.75 6.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Zm3 1a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Zm2.5 1.5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0Zm-.75 3.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM13.25 14a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0Zm.447-11.008c-2.754-1.415-5.554-1.28-7.927.174c-1.21.742-2.517 2.303-3.254 3.893c-.37.8-.617 1.646-.614 2.434c.004.801.268 1.566.938 2.112c.61.498 1.142.748 1.656.773c.518.026.922-.184 1.238-.37c.07-.041.135-.081.197-.119c.242-.147.441-.268.69-.346c.28-.09.637-.122 1.155.036c.19.058.306.144.386.244c.086.106.155.254.206.466c.052.213.08.464.1.76c.009.11.016.237.023.369c.012.192.023.397.039.586c.054.67.17 1.436.574 2.132c.414.713 1.1 1.303 2.203 1.68c1.602.548 3.066.103 4.206-.8c1.126-.891 1.956-2.24 2.371-3.589c1.315-4.273-.211-8.393-4.187-10.435ZM6.292 4.019c2.065-1.265 4.492-1.4 6.948-.138c3.507 1.802 4.873 5.4 3.688 9.252c-.366 1.19-1.094 2.354-2.036 3.1c-.929.735-2.043 1.053-3.261.637c-.904-.31-1.384-.757-1.663-1.236c-.288-.497-.39-1.078-.442-1.712c-.015-.189-.025-.36-.035-.534a28.417 28.417 0 0 0-.025-.41a5.674 5.674 0 0 0-.126-.925a2.171 2.171 0 0 0-.4-.86a1.748 1.748 0 0 0-.872-.57c-.702-.215-1.265-.187-1.75-.034c-.375.12-.698.317-.946.47l-.146.087c-.285.169-.472.244-.68.234c-.213-.01-.543-.118-1.074-.55c-.385-.314-.567-.763-.57-1.34c-.002-.591.186-1.288.521-2.01c.674-1.453 1.862-2.844 2.87-3.461Z"/></svg>
                    </button>
                    
                {/if}
                
                <span>{name}</span>
            </div>
        {/each}

        <div>Events</div>
        {#each events as {name, duration} }
            <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M6.19 2.77c.131-.456.548-.77 1.022-.77h5.25c.725 0 1.237.71 1.007 1.398l-.002.008L12.205 7h2.564c.947 0 1.407 1.144.767 1.811l-.004.004l-8.676 8.858c-.755.782-2.06.06-1.796-.996l1.17-4.679H4.963a1.062 1.062 0 0 1-1.022-1.354l2.25-7.873ZM7.213 3a.062.062 0 0 0-.06.045l-2.25 7.874c-.01.04.02.08.06.08H6.87a.5.5 0 0 1 .485.62l-1.325 5.3a.086.086 0 0 0-.003.03c0 .004.002.008.003.011c.004.008.013.02.03.03c.018.01.034.01.042.01a.03.03 0 0 0 .01-.004a.087.087 0 0 0 .024-.018l.004-.004l8.675-8.856a.056.056 0 0 0 .017-.032a.084.084 0 0 0-.007-.044a.079.079 0 0 0-.025-.034c-.005-.004-.013-.008-.03-.008H11.5a.5.5 0 0 1-.472-.666l1.493-4.254a.062.062 0 0 0-.06-.08H7.212Z"/></svg>
                <span>{name}</span>
            </div>
        {/each}

        <div>IK Constraints</div>
        {#each ikConstraints as {name, bendDirection, order, bones} }
            <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M9.314 2.036a.5.5 0 0 1 .344-.01l6 2a.5.5 0 0 1 .068.92l-.005.002l-.02.01l-.078.043a9.676 9.676 0 0 0-1.207.785a5.75 5.75 0 0 0-.937.876c-.22.267-.374.529-.45.777l1.859 3.719l1.999 1.332A2.5 2.5 0 0 1 18 14.57v1.93a.5.5 0 0 1-.477.5l-.023-.5l.023.5h-.038a12.791 12.791 0 0 1-.47.004a21.978 21.978 0 0 1-5.653-.837c-3.326-.958-7.23-3.025-9.314-7.454a.5.5 0 0 1 .005-.437c.643-1.285 1.825-2.587 3.139-3.685c1.318-1.1 2.813-2.032 4.122-2.555ZM17 16.005v-.54c-7.413-.598-11.411-4.195-13.55-7.58a7.08 7.08 0 0 0-.39.625c1.94 3.919 5.463 5.798 8.579 6.697a20.971 20.971 0 0 0 5.361.798Zm-.668-2.683l-1.65-1.1l-.923 1.726c.992.24 2.069.415 3.237.514a1.5 1.5 0 0 0-.664-1.14ZM12.145 7.91l-1.584-.528l1.876 3.376a.5.5 0 0 1-.071.584l-1.52 1.633c.599.263 1.239.5 1.922.706l1.17-2.188l-1.793-3.583Zm.032-1.044a3.62 3.62 0 0 1 .531-.84a6.776 6.776 0 0 1 1.1-1.033a9.04 9.04 0 0 1 .503-.361L9.518 3.033C8.405 3.504 7.125 4.3 5.96 5.253l1.894 1.893a.5.5 0 0 1 .141.425l-.485 3.394c.703.563 1.496 1.09 2.391 1.556l1.486-1.596l-2.324-4.182a.5.5 0 0 1 .595-.717l2.52.84Zm-6.973-.954c-.398.368-.769.749-1.1 1.132a14.816 14.816 0 0 0 2.508 3.139l.358-2.505L5.204 5.91Z"/></svg>
                <span>{name} --- </span>
                {#each Object.values(bones) as bone }
                    <span class="alt">{bone.name} </span>
                {/each}
            </div>
        {/each}

        <div>Animations</div>
        {#each animations as {name, floatValue} }
            <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M9.125 7.184A.75.75 0 0 0 8 7.834v4.333a.75.75 0 0 0 1.125.65l4.125-2.384a.5.5 0 0 0 0-.866L9.125 7.184ZM2 10a8 8 0 1 1 16 0a8 8 0 0 1-16 0Zm8-7a7 7 0 1 0 0 14a7 7 0 0 0 0-14Z"/></svg>
                <span>{name}</span>
            </div>
        {/each}


        <div>Attachments</div>
        {#each attachments as attachment, i }
            <!-- Each entries -->
            {#each Object.entries(attachment) as [ name, entry ] }
                <div class="item">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M8 6a.5.5 0 0 1 .09.992L8 7H6a3 3 0 0 0-.197 5.994L6 13h2a.5.5 0 0 1 .09.992L8 14H6a4 4 0 0 1-.22-7.994L6 6h2Zm6 0a4 4 0 0 1 .22 7.994L14 14h-2a.5.5 0 0 1-.09-.992L12 13h2a3 3 0 0 0 .197-5.994L14 7h-2a.5.5 0 0 1-.09-.992L12 6h2ZM6 9.5h8a.5.5 0 0 1 .09.992L14 10.5H6a.5.5 0 0 1-.09-.992L6 9.5h8h-8Z"/></svg>
                    <span>{name}</span>
                    <span class="alt">@ {entry.path}</span>
                </div>
            {/each}
        {/each}

        <div>Hookable Slot</div>
        {#each slots as slot }
            {#if slot.data.attachmentName !== null}
                <div class="item">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5 2a3 3 0 0 1 .5 5.959V10H11a1.5 1.5 0 0 0 1.5-1.5v-.541a3 3 0 1 1 1 0V8.5A2.5 2.5 0 0 1 11 11H5.5v1.041a3 3 0 1 1-1 0V7.96A3 3 0 0 1 5 2ZM3 5a2 2 0 1 0 4 0a2 2 0 0 0-4 0Zm0 10a2 2 0 1 0 4 0a2 2 0 0 0-4 0Zm10-8a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm-.5 6a2.5 2.5 0 0 0 0 5h.5a.5.5 0 0 0 0-1h-.5a1.5 1.5 0 0 1 0-3h.5a.5.5 0 0 0 0-1h-.5Zm3.5 0a.5.5 0 0 0 0 1h.5a1.5 1.5 0 0 1 0 3H16a.5.5 0 0 0 0 1h.5a2.5 2.5 0 0 0 0-5H16Zm-4 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Z"/></svg>
                    <span>{slot.data.attachmentName}</span>
                </div>
            {/if}
            
        {/each}
        
       <!--  -->
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

    .item svg {
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 0;
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

    .item.active > span {
        color: #F0F0F0;
    }

    .item.active svg {
        color: #368DCA;
    }

    .item > span {
        line-height: 20px;
        font-stretch: semi-condensed;
        font-size: 15px;
        padding-left: 4px;
        color: #D0D0D0;
    }

    .item > .alt {
        line-height: 20px;
        font-stretch: semi-condensed;
        font-size: 15px;
        padding-left: 4px;
        color: #686868;
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

    .toolbar > button {
        display: flex;
        padding: 2px;
    }

    .toolbar > button:hover {
        background: #464646;
        cursor: pointer;
    }

    .toolbar > button > svg {
        width: 20px;
        height: 20px;
    }

    .toolbar > button .dropdown {
        height: 100%;
    }

    .toolbar > button .dropdown:hover {
        pointer-events: all;
        background: #505050;

        cursor: pointer;
    }


    .toolbar > button .dropdown > svg {
        height: 100%;
    }

    .dropdown-menu {
        position: absolute;
        left: 0;

        z-index: 1000;
        display: none;
        float: left;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin-top: 24px;

        background-color: #3F3F3F;
        border: 1px solid #636363;

        box-shadow: 0px 2px 8px #00000026;
    }

    .menu-options {
        display: flex;
        flex-direction: column;
    }


</style>