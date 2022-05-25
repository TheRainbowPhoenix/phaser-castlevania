<script>
    import BaseComponent from "./BaseComponent.svelte";

    export let item;

</script>

<BaseComponent name="Transform">
    <div slot="icon">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2l4 4h-3v7.85l6.53 3.76L21 15.03l1.5 5.47l-5.5 1.46l1.53-2.61L12 15.58l-6.53 3.77L7 21.96L1.5 20.5L3 15.03l1.47 2.58L11 13.85V6H8l4-4Z"/></svg>
    </div>

    <div class="line">
        <span>Position</span>
        <div class="values">
            <label>X <input bind:value={item.x} type="number"></label>
            <label>Y <input bind:value={item.y} type="number"></label>
            <label>Z <input bind:value={item.z} type="number"></label>
        </div>
    </div>

    {#if item.originX && item.originY}
        <div class="line">
            <span>Origin</span>
            <div class="values">
                <label>X <input bind:value={item.originX} type="number" step="0.1"></label>
                <label>Y <input bind:value={item.originY} type="number" step="0.1"></label>
            </div>
        </div>
    {/if}

    {#if item.scaleX && item.scaleY}
        <div class="line">
            <span>Scale</span>
            <div class="values">
                <label>X <input bind:value={item.scaleX} type="number" step="0.1"></label>
                <label>Y <input bind:value={item.scaleY} type="number" step="0.1"></label>
            </div>
        </div>
    {/if}

    <div class="line">
        <span>Rotation</span>
        <div class="values">
            <label><input bind:value={item.angle} type="number"></label>
        </div>
    </div>

    
    {#if item.height && item.width}
        <div class="line">
            <span>Size</span>
            <div class="values">
                <label>Width <input bind:value={item.width} type="number" step="0.1"></label>
                <label>Height <input bind:value={item.height} type="number" step="0.1"></label>
            </div>
        </div>
    {/if}
    
</BaseComponent>

<style>
    .line {
        padding-left: 1rem;
        display: flex;
        /* width: 100%; */
    }

    span {
        margin-right: auto;
    }

    input[type="number"] {
        width: 50px;
    }
</style>