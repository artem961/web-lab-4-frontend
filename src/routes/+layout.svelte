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
	<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105883176', 'ym');

    ym(105883176, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/105883176" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
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
