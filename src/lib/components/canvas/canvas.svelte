<script lang="ts">
    import { onMount } from "svelte";
    import "./scripts/importAllScripts";
    import { CanvasController } from "./scripts/tools/canvas-controller";
    import { Plane } from "./scripts/tools/plane";
    import InputButtonsGroup from "../forms/inputs/inputButtonsGroup.svelte";
    import { checkHit } from "$lib/api/api";
    import type { CheckResult } from "$lib/api/interfaces";
    import { createPoint } from "./scripts/interactiveObjects/point-object";

    let { r = $bindable(), results } = $props();
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

        canvas?.addEventListener("click", (event) => {
            let position = CanvasController.getCursorPositionOnCanvas(
                event,
                canvas,
            );
            let x = ((position.x / (canvas.width / 3)) * plane.R).toFixed(2);
            let y = ((position.y / (canvas.height / 3)) * plane.R).toFixed(2);
            let res = checkHit({ x: x, y: y, r: r });

            console.log(res);
            res.then((result) => {
                if (result.result) {
                    plane.addPoint(
                        createPoint(
                            canvas,
                            result.result.x,
                            result.result.y,
                            result.result.r,
                            result.result.result,
                        ),
                    );
                    canvasController.updateFrame();

                    results.push({
                        x: result.result.x,
                        y: result.result.y,
                        r: result.result.r,
                        result: result.result.result,
                        time: result.result.time,
                        current_time: result.result.current_time
                    });
                }
            });
        });
    });
</script>

<div class="canvas-wrapper">
    <div id="canvas-container">
        <canvas id="canvas" width="400" height="400"></canvas>
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
