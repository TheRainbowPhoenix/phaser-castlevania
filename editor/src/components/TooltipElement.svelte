<script>
	export let title;
	export let x;
	export let y;
</script>
<div style="
		top: {y + 12}px;
		left: {x + 12}px;">{title}</div>

<style>
	div {
		border: 1px solid #1A1A1A;
		box-shadow: 0px 1px 1px rgba(0,0,0,0.3);
		background: #3F3F3F;
		color: #F0F0F0;
		border-radius: .125rem;
		padding: 4px;
		position: absolute;
		
		opacity: 0;

		animation-duration: .125s;
  		animation-name: slidein;
		animation-delay: 1s;
		animation-timing-function: ease-in;
		animation-fill-mode: forwards;
	}

	@keyframes slidein {
		from {
			opacity: 0;
			margin-top: -0.5em;
		}

		to {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>