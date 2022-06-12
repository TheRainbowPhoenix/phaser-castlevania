<script lang="ts">
    export let show: boolean = false
</script>

{#if show}
    <div class="root">
        hello
        <p>
            very big
        </p>
    </div>
{/if}

<style>
    .root {
        border: 1px solid #1A1A1A;
		box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
		background: #3F3F3F;
		color: #F0F0F0;
		border-radius: .125rem;
		padding: 4px;
		position: absolute;
        margin-top: 32px;
    }
    p {
        width: 250px;
        height: 250px;
    }
</style>