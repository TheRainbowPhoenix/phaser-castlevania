<script>
	export let title;
	export let x;
	export let y;
</script>
<div style="
		top: {y + 5}px;
		left: {x + 5}px;">{title}</div>

<style>
	div {
		border: 1px solid #1A1A1A;
		box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
		background: #3F3F3F;
		border-radius: .125rem;
		padding: 4px;
		position: absolute;
	}
</style>