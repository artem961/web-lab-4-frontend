<script>
	import Textfield from "@smui/textfield";
	let { value, label, type=""} = $props();
</script>

<Textfield 
	variant="outlined"
 	bind:value 
	label={label}
	type={type}>
</Textfield>
