<script>
    export let image;

</script>

<div>Active: {image.active}</div>
<div>cameraFilter: {image.cameraFilter}</div>

<div>H:{image.height} W:{image.width} - x:{image.x} y:{image.y} z:{image.z} w:{image.w}</div>
<div>originX:{image.originX} originY:{image.originY}</div>
<div>tabIndex:{image.tabIndex}</div>

<label>
    x: <input bind:value={image.x} type="number">
</label>


<label>
    y: <input bind:value={image.y} type="number">
</label>