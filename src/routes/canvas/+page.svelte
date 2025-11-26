<script>
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";
    import InputButtonsGroup from "$lib/components/forms/inputs/inputButtonsGroup.svelte";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);

    setTimeout(()=>{
        console.log(x, y, r);
    }, 2000)
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
        flex-direction: column;
        gap: 4rem;
    }
</style>
