<script>
    import Header from "$lib/components/header.svelte";
    import AuthForm from "$lib/components/forms/authForm.svelte";
</script>

<div class="wrapper">
    <Header/>
    <AuthForm />
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .link{
        width: 100%;
        
    }
</style>
