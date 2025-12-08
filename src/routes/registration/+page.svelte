<script>
    import Header from "$lib/components/header.svelte";
    import RegForm from "$lib/components/forms/regForm.svelte";
</script>

<div class="wrapper">
    <RegForm />
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 80vh;
        padding: 2rem;
    }
</style>
