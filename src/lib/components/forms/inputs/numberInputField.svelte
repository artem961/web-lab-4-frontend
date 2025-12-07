<script lang="ts">
	import Textfield from "@smui/textfield";
	import HelperText from "@smui/textfield/helper-text";

	let { helperText = "", value = $bindable(0), ...props } = $props();
	let messageText = $state(helperText);

	function isValidFloat(number: string): boolean {
		return /^-?\d*\.?\d+$/.test(number);
	}

	$effect(() => {
		if (!isValidFloat(value.toString())) {
			messageText = "Value must be a number";
		} else if (props.max && value > props.max) {
			messageText = "Value must be lower then " + props.max;
		} else if (props.min && value < props.min) {
			messageText = "Value must be greater then " + props.min;
		} else {
			messageText = helperText;
		}
	});
</script>

<div>
	<Textfield variant="outlined" bind:value {...props}>
		{#snippet helper()}
			<HelperText>{messageText}</HelperText>
		{/snippet}
	</Textfield>
</div>
