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
			messageText = "Значение должно быть числом!";
		} else if (props.max && value > props.max) {
			messageText = "Значение должно быть меньше " + props.max;
		} else if (props.min && value < props.min) {
			messageText = "Значение должно быть больше " + props.min;
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
