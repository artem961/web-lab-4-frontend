<script lang="ts">
	import "$lib/styles/main.scss";
	import config from "$lib/app-config.json";
	import duck from "$lib/assets/duck.png";
	import { FlatToast, ToastContainer } from "svelte-toasts";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={duck} />
	<title>{config.app_name}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<ToastContainer
	placement={"top-left"}
	showProgress={true}
	let:data
	duration={3500}
>
	<FlatToast {data} />
</ToastContainer>

{@render children()}
