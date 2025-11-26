<script>
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);
</script>

<div class="wrapper">
    <div class="canvas-column">
        <Canvas bind:r={r} />
    </div>
    <div class="table-column"></div>
    <div class="menu-column">
        <PointsForm bind:x={x} bind:y={y}/>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        gap: 4rem;
    }
</style>
