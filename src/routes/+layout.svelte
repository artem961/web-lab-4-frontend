<script lang="ts">
	import "$lib/styles/main.scss";
	import config from "$lib/app-config.json";
	import duck from "$lib/assets/duck.png";
	import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
    import { onMount } from "svelte";

	let { children } = $props();
	

	onMount(()=>{
		let urlParams = new URLSearchParams(window.location.search);

		if (urlParams.get("unauthorized") === "true"){
			toasts.error("Please sign in")
		}
	})
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
