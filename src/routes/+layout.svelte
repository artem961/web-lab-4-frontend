<script lang="ts">
	import '$lib/styles/main.scss';
	import config from '$lib/app-config.json';
	import duck from '$lib/assets/duck.png';
    import { FlatToast, ToastContainer } from 'svelte-toasts';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={duck}/>
	<title>{config.app_name}</title>
</svelte:head>
<ToastContainer placement={"top-left"} showProgress={true} let:data={data} duration={3500}>
  <FlatToast {data} />
</ToastContainer>

{@render children()}
