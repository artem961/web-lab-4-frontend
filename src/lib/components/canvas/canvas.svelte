<script>
    import { onMount } from "svelte";
    import "./scripts/importAllScripts";
    import { CanvasController } from "./scripts/tools/canvas-controller";
    import { Plane } from "./scripts/tools/plane";
    import InputButtonsGroup from "../forms/inputs/inputButtonsGroup.svelte";

    import { checkHit } from "$lib/api/api";

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

<div class="canvas-wrapper">
    <div id="canvas-container">
        <canvas
            id="canvas"
            width="400"
            height="400"
            onclick={() => {
                console.log(checkHit({ x: 1, y: 2, r: 4 }));
            }}
        ></canvas>
    </div>
    <div class="buttons">
        <InputButtonsGroup
            bind:valueForUpdate={r}
            rangeOfValues={[1, 2, 3, 4, 5, 6]}
            columns={3}
            onSelectExecuteFunction={() => {
                selectFunction();
            }}
        ></InputButtonsGroup>
    </div>
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

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .canvas-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 3rem;
    }
</style>
