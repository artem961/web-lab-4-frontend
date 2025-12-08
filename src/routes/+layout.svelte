<script lang="ts">
	import '$lib/styles/main.scss';
	import config from '$lib/app-config.json';
	import duck from '$lib/assets/duck.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={duck}/>
	<title>{config.app_name}</title>
</svelte:head>

{@render children()}
