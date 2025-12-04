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
        flex-direction: column;
        gap: 4rem;
    }
</style>
