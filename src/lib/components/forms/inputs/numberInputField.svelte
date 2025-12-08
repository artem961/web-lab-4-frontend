<script lang="ts">
	import { Label } from "@smui/button";
	import Textfield from "@smui/textfield";
	import HelperText from "@smui/textfield/helper-text";
	import Layout from "../../../../routes/+layout.svelte";

	let {
		helperText = "",
		value = $bindable(0),
		valid = $bindable(),
		...props
	} = $props();
	let messageText = $state(helperText);
	let focused = $state(false);

	function isValidFloat(number: string): boolean {
		return /^-?\d*\.?\d+$/.test(number);
	}

	$effect(() => {
		valid = false;
		if (!isValidFloat(value.toString())) {
			messageText = "Value must be a number";
		} else if (props.max && value > props.max) {
			messageText = "Value must be lower then " + props.max;
		} else if (props.min && value < props.min) {
			messageText = "Value must be greater then " + props.min;
		} else {
			messageText = helperText;
			valid = true;
		}
	});
</script>

<div class="wrapper">
	<Textfield
		variant="outlined"
		bind:value
		onfocus={() => {
			focused = true;
		}}
		onblur={() => {
			focused = false;
		}}
		{...props}
	>
		{#snippet helper()}
			<HelperText style={!valid ? "color: red" : ""}
				>{messageText}</HelperText
			>
		{/snippet}
	</Textfield>
	<div class="label">
		{#if !focused && !valid}
			<Label style="color: red">Value is invalid</Label>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	.label{
		height: 1rem;
	}
</style>
