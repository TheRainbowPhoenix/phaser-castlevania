<script lang="ts">
    export let locked: boolean = false
</script>

<!-- TODO: remove hardcoded style -->
<div class="panel"
    style="height: 450px;"
>
    <div class="header">
        <!-- TODO: put handles to parent, maybe slot ? -->
        <div class="handles">
            <div class="tab">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2 4.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM2 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm5 3.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM5.5 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM5 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 5 8Zm4.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z"/></svg>
                <span>Hierarchy</span>
            </div>

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
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.096 5.089 5.605 4 8 4s3.904 1.089 4.802 2.183a6.7 6.7 0 0 1 1.117 1.982a4.077 4.077 0 0 1 .06.187l.003.013v.004l.001.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.872 4.872 0 0 0-.2-.52a5.696 5.696 0 0 0-.78-1.263C11.286 5.912 10.044 5 8 5c-2.044 0-3.285.912-4.028 1.817a5.7 5.7 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025ZM5.5 9.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2.984 8.625v.003a.5.5 0 0 1-.612.355c-.431-.114-.355-.611-.355-.611l.018-.062s.026-.084.047-.145a6.7 6.7 0 0 1 1.117-1.982C4.096 5.089 5.605 4 8 4s3.904 1.089 4.802 2.183a6.7 6.7 0 0 1 1.117 1.982a4.077 4.077 0 0 1 .06.187l.003.013v.004l.001.002a.5.5 0 0 1-.966.258l-.001-.004l-.008-.025a4.872 4.872 0 0 0-.2-.52a5.696 5.696 0 0 0-.78-1.263C11.286 5.912 10.044 5 8 5c-2.044 0-3.285.912-4.028 1.817a5.7 5.7 0 0 0-.945 1.674a3.018 3.018 0 0 0-.035.109l-.008.025ZM8 7a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5ZM6.5 9.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A5.987 5.987 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a4.94 4.94 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446Zm-.74-.74A1.5 1.5 0 1 1 7.413 8.12l1.969 1.968ZM6.32 4.2l.854.854C7.434 5.019 7.709 5 8 5c2.044 0 3.286.912 4.028 1.817a5.695 5.695 0 0 1 .945 1.674c.017.048.028.085.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2.3 2.3 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.088 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199Z"/></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708L12.707 6L9.998 3.294l.734-.734Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632L5.4 13.06c.243-.08.463-.217.644-.398L12 6.708L9.292 4.001Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M13.44 2.56a1.914 1.914 0 0 0-2.707 0L3.338 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632l2.743-.914c.243-.08.463-.217.644-.398l7.395-7.394a1.914 1.914 0 0 0 0-2.708Zm-2 .708a.914.914 0 1 1 1.293 1.292L12 5.294l-1.293-1.293l.734-.733ZM10 4.708l1.292 1.293l-5.954 5.954a.648.648 0 0 1-.253.156l-1.794.598l.598-1.793a.649.649 0 0 1 .156-.254L10 4.708Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m9 9.707l5.146 5.147a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708L6.293 7L3.338 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632l2.743-.914c.243-.08.463-.217.644-.398L9 9.707ZM8.293 9l-2.955 2.955a.648.648 0 0 1-.253.156l-1.794.598l.598-1.793a.649.649 0 0 1 .156-.254L7 7.707L8.293 9Zm3-2.999L9.706 7.586l.707.707l3.026-3.025a1.914 1.914 0 0 0-2.707-2.708L7.707 5.586l.707.707L10 4.708l1.293 1.293Zm.147-2.733a.914.914 0 1 1 1.293 1.292L12 5.294l-1.293-1.293l.734-.733Z"/></svg>

        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M4.697 5.04a.5.5 0 0 0-.394.919L7.5 7.329v3.17a.5.5 0 0 0 1 0V7.33l3.197-1.37a.5.5 0 1 0-.394-.92L8 6.456L4.697 5.04Zm4.38-3.662a3 3 0 0 0-2.154 0L1.962 3.286A1.5 1.5 0 0 0 1 4.686v6.626a1.5 1.5 0 0 0 .962 1.4l4.961 1.909a3 3 0 0 0 2.154 0l4.962-1.909a1.5 1.5 0 0 0 .961-1.4V4.686a1.5 1.5 0 0 0-.961-1.4L9.077 1.378Zm-1.795.933a2 2 0 0 1 1.436 0l4.962 1.908a.5.5 0 0 1 .32.467v6.626a.5.5 0 0 1-.32.467l-4.962 1.908a2 2 0 0 1-1.436 0L2.321 11.78A.5.5 0 0 1 2 11.312V4.686a.5.5 0 0 1 .32-.467l4.962-1.908Z"/></svg>
    </div>

</div>

<style>
    .panel {
        background: #202020;
        padding-right: 2px;
    }

    .handles {
        height: 24px;

        display: flex;

        background: #282828;
        border-top-right-radius: .375rem;
        border-bottom: 1px solid #232323;

        
    }

    .tab {
        display: flex;
        background: #3C3C3C;
        border-top-right-radius: .375rem;
        align-items: center;
        border-right: 1px solid #232323;

        padding: 2px 5px;
        min-width: 102px;
    }

    .tab > svg {
        width: 16px;
        height: 16px;
        padding: 2px;
    }

    .tab > span {
        line-height: 24px;
    }

    .pane-control {
        margin-top: 2px;
        margin-right: 7px;
        margin-left: auto;
    }

    .pane-control svg {
        width: 16px;
        height: 16px;
        padding: 2px;
    }

    .pane-control button {
        height: 20px;

    }

    .pane-control button:hover {
        background: #505050;
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