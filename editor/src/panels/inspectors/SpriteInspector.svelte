<script>
import BodyComponent from "../../components/inspector/BodyComponent.svelte";
import TransformComponent from "../../components/inspector/TransformComponent.svelte";

    export let sprite;

</script>

<!-- originX: 0.5, originY: 0.5 ==> Unity-like box ? -->

<TransformComponent bind:item={sprite} />


{#if sprite.body}
    <BodyComponent bind:item={sprite.body}/>

    <!-- <h2>Body</h2> -->
    <!-- TODO: unity-like panels :D -->
    <!-- <div>allowGravity: {sprite.body.allowGravity}</div>
    <div>mass: {sprite.body.mass}</div>
    <div>pushable: {sprite.body.pushable}</div> -->

    <div>H:{sprite.body.height} W:{sprite.body.width} - x:{sprite.body.x} y:{sprite.body.y}</div>


    <label>
        x: <input bind:value={sprite.body.x} type="number" step="0.1">
    </label>

    <!-- halfHeight, halfWidth,  -->
    <label>
        y: <input bind:value={sprite.body.y} type="number" step="0.1">
    </label>

    <label>
        width: <input bind:value={sprite.body.width} type="number">
    </label>

    <label>
        height: <input bind:value={sprite.body.height} type="number">
    </label>
{/if}