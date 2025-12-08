<script>
	import Textfield from "@smui/textfield";
	import HelperText from "@smui/textfield/helper-text";
	import { Label } from "@smui/button";
	let {
		helperText = "",
		value = $bindable(""),
		errorText = "",
		...props
	} = $props();
</script>

<div class="wrapper">
	<Textfield variant="outlined" bind:value {...props}>
		{#snippet helper()}
			<HelperText>{helperText}</HelperText>
		{/snippet}
	</Textfield>
	<div class="error">
		<Label>{errorText}</Label>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.error {
		height: 24px;
		margin-top: 4px;
		color: #d32f2f;
	}
</style>
