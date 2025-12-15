<script lang="ts">
    import { onMount } from "svelte";
    import { CanvasController } from "./scripts/tools/canvas-controller";
    import { Plane } from "./scripts/tools/plane";
    import InputButtonsGroup from "../forms/inputs/inputButtonsGroup.svelte";
    import type { CheckResult, FetchResult } from "$lib/api/interfaces";
    import { createPoint } from "./scripts/interactiveObjects/point-object";
    import { devicePixelRatio } from "svelte/reactivity/window";
    import { Label } from "@smui/button";
    import { checkHit } from "$lib/api/resultsApi";

    let { r = $bindable(), results = $bindable() } = $props();

    let canvasSide = $state(400);

    let canvasElement: HTMLCanvasElement;
    let canvasController: CanvasController | null = null;
    let plane: Plane | null = null;
    let selectFunction = () => {};

    onMount(() => {
        const canvasController = new CanvasController(canvasElement);
        let plane = new Plane(canvasController, r);
        plane.initObjects();

        canvasElement.addEventListener("click", (event) =>
            handleCanvasClick(event),
        );

        canvasController.updateFrame();

        selectFunction = () => {
            plane.switchLabels(r);
        };

        function addPointToResults(result: CheckResult) {
            if (!plane || !canvasElement) return;

            results.push(result);

            canvasController?.updateFrame();
        }

        async function handleCanvasClick(event: MouseEvent) {
            if (!canvasController || !plane || !canvasElement) return;

            const position = CanvasController.getCursorPositionOnCanvas(
                event,
                canvasElement,
            );
            let x = Number(
                ((position.x / (canvasElement.width / 3)) * plane.R).toFixed(2),
            );
            let y = Number(
                ((position.y / (canvasElement.height / 3)) * plane.R).toFixed(
                    2,
                ),
            );

            try {
                const response = await checkHit({ x, y, r });

                if (response.result) {
                    addPointToResults(response.result);
                }
            } catch (error) {
                console.error("Error checking hit:", error);
            }
        }

        $effect(() => {
            plane.clearPoints();

            results.forEach((result: CheckResult) => {
                plane.addPoint(
                    createPoint(
                        canvasElement,
                        result.x / result.r,
                        result.y / result.r,
                        result.r,
                        result.result,
                    ),
                );
            });

            canvasController.updateFrame();
        });
    });

</script>

<div class="canvas-wrapper">
    <div id="canvas-container">
        <canvas bind:this={canvasElement} id="canvas" width={canvasSide} height={canvasSide}
        ></canvas>
    </div>
    <div class="buttons">
        <Label>R</Label>
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
        gap: 1rem;
    }

    .canvas-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 3rem;

         @media (max-width: 643px) {
            scale:0.85;
            gap:1rem;
        }
    }
</style>
