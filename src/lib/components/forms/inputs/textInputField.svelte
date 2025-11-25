<script>
	import Textfield from "@smui/textfield";
	import HelperText from "@smui/textfield/helper-text";
	let {helperText="", value= $bindable(""), ...props} = $props();
</script>

<Textfield variant="outlined" bind:value={value} {...props}>
	{#snippet helper()}
		<HelperText>{helperText}</HelperText>
	{/snippet}
</Textfield>
