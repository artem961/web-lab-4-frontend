<script>
    import { onMount } from "svelte";
    import "./scripts/importAllScripts";
    import { CanvasController } from "./scripts/tools/canvas-controller";
    import { Plane } from "./scripts/tools/plane";
    import InputButtonsGroup from "../forms/inputs/inputButtonsGroup.svelte";

    let { r = $bindable() } = $props();
    let selectFunction = () => {};

    onMount(() => {
        const canvas = document.getElementById("canvas");
        const canvasController = new CanvasController(canvas);

        let plane = new Plane(canvasController, r);
        plane.initObjects();
        canvasController.updateFrame();
        
        selectFunction = () => {
            plane.switchLabels(r);
        };
    });
</script>

<div id="canvas-wrapper">
    <div id="canvas-container">
        <canvas id="canvas" width="400" height="400"></canvas>
    </div>
    <InputButtonsGroup
        bind:valueForUpdate={r}
        rangeOfValues={[1, 2, 3, 4, 5, 6]}
        columns={3}
        onSelectExecuteFunction={() => {
            selectFunction();
        }}
    ></InputButtonsGroup>
</div>

<style>
    canvas {
        background-color: var(--paper-color);
        color: var(--paper-color);
        border: var(--border-s) solid var(--secondary-text-color);
        padding: 5px;
        border-radius: var(--radius-xl);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
</style>
