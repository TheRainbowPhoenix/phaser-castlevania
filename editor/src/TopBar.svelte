<script>
    import { tooltip } from "./utils/tooltip";

    export let gameRef;

    let assetLocal = false
    let handleCenter = false

    let playing = true
    let pausing = false

    function resumeGame() {
        if (!playing) {
            playing = true
            pausing = false
            gameRef.loop.wake();
        }
        
    }

    function pauseGame() {
        if (!pausing) {
            playing = false
            pausing = true
            gameRef.loop.sleep();
        }
        
    }

    function stepGame() {
        gameRef.loop.step();
    }

    
</script>

<div class="bar">
    <div class="items">
        <button title="Hand Tool" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M11 8.5V2.75a.75.75 0 0 0-1.5 0V8.5a.5.5 0 0 1-1 0V3.75a.75.75 0 0 0-1.5 0v6.5c-.662-.426-1.392-.75-2-.75c-.971 0-1.787.324-1.984 1.116A.604.604 0 0 0 3 10.76c0 .15.07.292.191.382l1.312.985c1.063.796 2.064 1.865 2.762 2.988a32.02 32.02 0 0 1 1.053 1.868C8.678 17.661 8.906 18 10 18h3.046c.954 0 1.317-.533 1.954-2s1-2.944 1-3.5V5.25a.75.75 0 0 0-1.5 0V9a.5.5 0 0 1-1 0V3.75a.75.75 0 0 0-1.5 0V8.5a.5.5 0 0 1-1 0Z"/></svg>
        </button>

        <button title="Move Tool" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10.354 2.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 1 0 .708.708L9.5 3.707V7.5a.5.5 0 0 0 1 0V3.707l1.646 1.647a.5.5 0 0 0 .708-.708l-2.5-2.5Zm-8.208 7.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 0 0 .708-.708L3.707 10.5H7.5a.5.5 0 0 0 0-1H3.707l1.647-1.646a.5.5 0 1 0-.708-.708l-2.5 2.5ZM10 18a.5.5 0 0 1-.354-.146l-2.5-2.5a.5.5 0 0 1 .708-.708L9.5 16.293V12.5a.5.5 0 0 1 1 0v3.793l1.646-1.647a.5.5 0 0 1 .708.708l-2.5 2.5A.5.5 0 0 1 10 18Zm7.854-7.646a.5.5 0 0 0 0-.708l-2.5-2.5a.5.5 0 0 0-.708.708L16.293 9.5H12.5a.5.5 0 0 0 0 1h3.793l-1.647 1.646a.5.5 0 0 0 .708.708l2.5-2.5Z"/></svg>
        </button>


        <button title="Rotate Tool" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M11.414 3.635a.5.5 0 0 0 0-.707L9.293.807a.5.5 0 0 0-.707.707l.997.997a7.5 7.5 0 0 0-4.075 13.495a.5.5 0 0 0 .6-.8A6.5 6.5 0 0 1 10.066 3.5c.024 0 .05-.002.073-.005L8.586 5.049a.5.5 0 0 0 .707.707l2.121-2.121ZM8.586 16.363a.5.5 0 0 0 0 .707l2.121 2.121a.5.5 0 0 0 .707-.707l-.997-.997a7.5 7.5 0 0 0 4.075-13.495a.5.5 0 1 0-.6.8a6.5 6.5 0 0 1-3.959 11.706a.502.502 0 0 0-.073.005l1.554-1.554a.5.5 0 1 0-.707-.707l-2.121 2.121Z"/></svg>
        </button>


        <button title="Scale Tool" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="m12.707 8l4.147-4.146a.5.5 0 0 0-.708-.708L12 7.293V3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-3.793ZM4 6a2 2 0 0 1 2-2h2.5a.5.5 0 0 0 0-1H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2.5a.5.5 0 0 0-1 0V14a2 2 0 0 1-2 2h-4v-4a2 2 0 0 0-2-2H4V6Zm0 5h4a1 1 0 0 1 1 1v4H6a2 2 0 0 1-2-2v-3Z"/></svg>
        </button>


        <button title="Rect Tool" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M6 4.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm11 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm-11 11a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm11 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM7 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-3-8a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5Zm11 0a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5Z"/></svg>
        </button>


        <button title="Move, Rotate or Scale selected objects." use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M11.414 3.635a.5.5 0 0 0 0-.707L9.293.807a.5.5 0 0 0-.707.707l.997.997a7.5 7.5 0 0 0-4.075 13.495a.5.5 0 0 0 .6-.8a6.5 6.5 0 0 1 5.29-11.554l.016-.017ZM8.586 16.363l.016-.016c.408.09.831.14 1.264.15l-.006.006a.502.502 0 0 1 .074-.004a6.5 6.5 0 0 0 3.959-11.706a.5.5 0 1 1 .6-.8a7.5 7.5 0 0 1-4.075 13.495l.996.996a.5.5 0 1 1-.707.707l-2.121-2.12a.5.5 0 0 1 0-.708Zm3.768-8.218a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L9 10.792l2.646-2.647a.5.5 0 0 1 .708 0ZM5 10a5 5 0 1 1 10 0a5 5 0 0 1-10 0Zm5-4a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z"/></svg>
        </button>


        <button title="Available Custom Editor Tools" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M17 12v-1.5a.569.569 0 0 0-.07-.273a.368.368 0 0 0-.172-.149a.868.868 0 0 0-.235-.062a2.08 2.08 0 0 0-.257-.016H16V5.117c.031-.068.076-.148.133-.242c.057-.094.112-.198.164-.312c.052-.115.099-.222.14-.32A.66.66 0 0 0 16.5 4a2.053 2.053 0 0 0-.07-.32a7.432 7.432 0 0 0-.157-.493a45.772 45.772 0 0 0-.18-.5a5.543 5.543 0 0 1-.116-.343a.57.57 0 0 0-.188-.25A.469.469 0 0 0 15.5 2h-2a.55.55 0 0 0-.297.102a.46.46 0 0 0-.18.242a11.3 11.3 0 0 1-.125.351a13.75 13.75 0 0 0-.171.5c-.058.177-.11.341-.157.493c-.047.15-.07.255-.07.312c0 .073.02.156.063.25c.041.094.09.198.148.313a17.292 17.292 0 0 0 .289.554V10h-.266a2.03 2.03 0 0 0-.265.016a.72.72 0 0 0-.235.07a.436.436 0 0 0-.171.148a.477.477 0 0 0-.063.266V12h5Zm0 1h-5v2.555c0 .338.068.656.203.953c.136.297.318.557.547.781A2.491 2.491 0 0 0 14.5 18c.333 0 .651-.065.953-.195a2.68 2.68 0 0 0 .797-.524a2.45 2.45 0 0 0 .547-.773a2.27 2.27 0 0 0 .203-.953V13ZM5.78 2.126a.5.5 0 0 1 .22.415v3.457a1 1 0 0 0 2 0V2.541a.5.5 0 0 1 .688-.463A4.501 4.501 0 0 1 9 10.282v5.716a2 2 0 1 1-4 0v-5.716a4.5 4.5 0 0 1 .312-8.204a.5.5 0 0 1 .467.048Z"/></svg>
        </button>


    </div>

    <div
        class="items"
    >
        <button
            title="Toogle Tool Handle Position" use:tooltip
            on:click="{() => handleCenter = !handleCenter }"
        >
            {#if handleCenter}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                    <path fill="#FA5449" d="M5 12a3 3 0 1 0 0 6 3 3 0 1 0 0-6zm0 1a2 2 0 1 1 0 4 2 2 0 1 1 0-4z"/>
                    <path color="currentColor" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v6.04a4 4 0 0 1 1-.4V5.5C4 4.67 4.67 4 5.5 4h9c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H8.87a4 4 0 0 1-.41 1h6.04a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 14.5 3h-9zm8.74 2.25a.52.52 0 0 0-.35.15l-6.44 6.44a4 4 0 0 1 .7.7l6.45-6.43c.2-.2.2-.5.02-.68l-.05-.05a.45.45 0 0 0-.33-.13z"/>
                </svg>
                <span>Pivot</span>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 20 20">
                    <path fill="currentColor" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v9A2.5 2.5 0 0 0 5.5 17h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 14.5 3h-9zm0 1h9c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 4 14.5v-9C4 4.67 4.67 4 5.5 4zm8.74 1.25a.52.52 0 0 0-.35.15l-1.44 1.44a4 4 0 0 1 .7.7l1.45-1.43c.2-.2.2-.5.02-.68l-.05-.05a.45.45 0 0 0-.33-.13zm-7.4 7.2L5.4 13.9c-.2.2-.2.5-.02.68l.05.05c.18.18.49.17.68-.02l1.44-1.44a4 4 0 0 1-.7-.7z"/>
                    <path fill="#FA5449" d="M10 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6zm0 1a2 2 0 1 1 0 4 2 2 0 1 1 0-4z"/>
                </svg>

                <span>Center</span>
            {/if}
        </button>


        <button
            title="Toogle Tool Handle Rotation" use:tooltip
            on:click="{() => assetLocal = !assetLocal }"
        >
            {#if assetLocal }
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.703 6.042a.5.5 0 1 0-.406.914L9.5 8.824V13.5a.5.5 0 0 0 1 0V8.824l4.203-1.868a.5.5 0 1 0-.406-.914L10 7.952l-4.297-1.91ZM11.3 2.481a3.5 3.5 0 0 0-2.6 0L2.943 4.784A1.5 1.5 0 0 0 2 6.176v7.646a1.5 1.5 0 0 0 .943 1.393L8.7 17.518a3.5 3.5 0 0 0 2.6 0l5.757-2.303A1.5 1.5 0 0 0 18 13.822V6.176a1.5 1.5 0 0 0-.943-1.392L11.3 2.48Zm-2.228.928a2.5 2.5 0 0 1 1.857 0l5.757 2.303a.5.5 0 0 1 .314.464v7.646a.5.5 0 0 1-.314.465l-5.758 2.303a2.5 2.5 0 0 1-1.856 0l-5.758-2.303A.5.5 0 0 1 3 13.822V6.176a.5.5 0 0 1 .314-.464L9.072 3.41Z"/></svg>
                <span>Local</span>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0-15c.657 0 1.407.59 2.022 1.908c.217.466.406 1.002.559 1.592H7.419c.153-.59.342-1.126.56-1.592C8.592 3.59 9.342 3 10 3ZM7.072 4.485A10.502 10.502 0 0 0 6.389 6.5H3.936a7.022 7.022 0 0 1 3.778-3.118c-.241.33-.456.704-.642 1.103ZM6.192 7.5A15.97 15.97 0 0 0 6 10c0 .87.067 1.712.193 2.5H3.46A6.984 6.984 0 0 1 3 10c0-.88.163-1.724.46-2.5h2.733Zm.197 6c.176.743.407 1.422.683 2.015c.186.399.401.773.642 1.103A7.022 7.022 0 0 1 3.936 13.5H6.39Zm1.03 0h5.162a9.248 9.248 0 0 1-.56 1.592C11.408 16.41 10.658 17 10 17c-.657 0-1.407-.59-2.022-1.908A9.254 9.254 0 0 1 7.42 13.5Zm5.375-1H7.206A14.87 14.87 0 0 1 7 10c0-.883.073-1.725.206-2.5h5.588c.133.775.206 1.617.206 2.5s-.073 1.725-.206 2.5Zm.817 1h2.453a7.022 7.022 0 0 1-3.778 3.118c.241-.33.456-.704.642-1.103c.276-.593.507-1.272.683-2.015Zm2.93-1h-2.734c.126-.788.193-1.63.193-2.5c0-.87-.067-1.712-.193-2.5h2.733c.297.776.46 1.62.46 2.5c0 .88-.163 1.724-.46 2.5Zm-4.255-9.118A7.021 7.021 0 0 1 16.064 6.5H13.61a10.504 10.504 0 0 0-.683-2.015a6.635 6.635 0 0 0-.642-1.103Z"/></svg>
                <span>Global</span>
            {/if}
        </button>
            

        <button class="disabled" title="Toogle Grid Snapping on and off." use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                <path fill="currentColor" d="M9.5 1c-.28 0-.5.2-.5.47V4H5V2.47C5 2.2 4.78 2 4.5 2s-.5.2-.5.47V4H2.5c-.28 0-.5.2-.5.47v.06c0 .26.22.47.5.47H4v4H1.5c-.28 0-.5.2-.5.47v.06c0 .26.22.47.5.47H4v4H2.5c-.28 0-.5.2-.5.47v.06c0 .26.22.47.5.47H4v1.53c0 .26.22.47.5.47s.5-.2.5-.47V15h1v-1H5v-4h2a1 1 0 0 1 1-1H5V5h4v4h1V5h4v4h1V5h1.5c.28 0 .5-.2.5-.47v-.06c0-.26-.22-.47-.5-.47H15V2.47c0-.26-.22-.47-.5-.47s-.5.2-.5.47V4h-4V1.47C10 1.2 9.78 1 9.5 1ZM8 10v3h3v-3H8zm0 6v3h3v-3H8z"/>
                <path fill="#FA5449" d="M12 10v3h2.5a1.5 1.5 0 1 1 0 3H12v3h3a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4z"/>
            </svg>
        </button>
    </div>


    <div class="items" style="margin: 6px auto;">
        <button title="Play" use:tooltip
            on:click="{resumeGame}"
            class:active={playing}
        >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497Z"/></svg>
        </button>

        <button title="Pause" use:tooltip
            on:click="{pauseGame}"
            class:active={pausing}
        >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5Zm8 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2Z"/></svg>
        </button>

        <button title="Step" use:tooltip
            on:click="{stepGame}"
            class="disabled"
        >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M3 4.252c0-1 1.116-1.595 1.947-1.038l8.499 5.707a1.25 1.25 0 0 1 .007 2.071l-8.5 5.793A1.25 1.25 0 0 1 3 15.752v-11.5ZM17 3.5a.5.5 0 0 0-1 0v13a.5.5 0 1 0 1 0v-13Z"/></svg>
        </button>
 
    </div>

    <div class="items">
        <button title="Collaborate" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="m13.073 15l-.384 1.605c-.184.771-.865 1.33-1.67 1.39l-.144.005h-1.75c-.818 0-1.535-.516-1.776-1.262l-.038-.133L6.928 15h6.145ZM10 2c3.314 0 6 2.597 6 5.8c0 1.677-.745 3.216-2.204 4.594a.599.599 0 0 0-.145.213l-.026.081L13.311 14h-2.81V9.497a.5.5 0 1 0-1 0V14H6.688l-.313-1.311a.595.595 0 0 0-.17-.295c-1.39-1.312-2.133-2.77-2.2-4.355L4 7.8l.003-.191C4.108 4.494 6.753 2 10 2Zm-.5 4.502v1.002a.5.5 0 0 0 1 0V6.502a.5.5 0 0 0-1 0Zm3.35.941a.5.5 0 0 0-.707 0l-.708.709a.5.5 0 0 0 .707.707l.709-.709a.5.5 0 0 0 0-.707Zm-4.998 0a.5.5 0 1 0-.707.707l.708.709a.5.5 0 1 0 .707-.707l-.708-.709Z"/></svg>
        </button>
    </div>

    <div class="items">
        <button title="Manage services" use:tooltip>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M10 4c2.817 0 4.415 1.923 4.647 4.246h.07c1.814 0 3.283 1.512 3.283 3.377C18 13.488 16.53 15 14.718 15H5.282C3.469 15 2 13.488 2 11.623c0-1.865 1.47-3.377 3.282-3.377h.071C5.587 5.908 7.183 4 10 4Z"/></svg>
        </button>
    </div>

    <div class="items">
        <button class="dropdown" title="Account profile" use:tooltip>
            <span>Account</span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.797 7a1 1 0 0 0-.778 1.628l3.814 4.723a1.5 1.5 0 0 0 2.334 0l3.815-4.723A1 1 0 0 0 14.204 7H5.797Z"/></svg>
        </button>
    </div>

    <div class="items">
        <button class="dropdown" title="Which layers are visible in the Scene views." use:tooltip>
            <span>Layers</span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.797 7a1 1 0 0 0-.778 1.628l3.814 4.723a1.5 1.5 0 0 0 2.334 0l3.815-4.723A1 1 0 0 0 14.204 7H5.797Z"/></svg>
        </button>
    </div>

    <div class="items">
        <button class="dropdown" title="Select editor layout" use:tooltip>
            <span>Layout</span>
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="currentColor" d="M5.797 7a1 1 0 0 0-.778 1.628l3.814 4.723a1.5 1.5 0 0 0 2.334 0l3.815-4.723A1 1 0 0 0 14.204 7H5.797Z"/></svg>
        </button>
    </div>
</div>

<style>
    .bar {
        background: #202020;
        /* width: 100%; */
        display: flex;
        padding: 0 5px;
        grid-column: span 2;
    }
    .items {
        height: 26px;
        gap: 1px;
        display: flex;
        margin: 6px;
    }

    .items > button:first-child {
        border-top-left-radius: .375rem;
        border-bottom-left-radius: .375rem;
    }

    .items > button:last-child {
        border-top-right-radius: .375rem;
        border-bottom-right-radius: .375rem;
    }

    .items > button {
        display: flex;
        background: #383838;
        min-width: 40px;
        height: 100%;
        transition: background .2s ease-in-out;
        padding: 3px 6px;
    }

    .items > button:hover {
        background:#424242;
    }
    
    .items > button:focus,
    .items > button.selected {
        background:#6A6A6A;
        color: #F0F0F0;
    }

    .items > button.disabled {
        background:#292929;
    }

    .items > button.disabled svg {
        opacity: 0.6;
    }

    .items > button > span {
        margin: 0 4px;
    }

    .items > button span {
        line-height: 26px;
        user-select: none;
        pointer-events: none;
        color: #D2D2D2;
    }

    .items > button svg {
        user-select: none;
        pointer-events: none;
        margin: 0 auto;
        width: 20px;
        height: 20px;
        color: #C4C4C4;
    }

    button {
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

    button.active {
        /* Note: this in an intended behaviour in Unity */
        background-color: #234A6C !important;
    }
</style>