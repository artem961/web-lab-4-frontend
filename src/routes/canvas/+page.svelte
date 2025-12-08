<script lang="ts">
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";
    import Table from "$lib/components/canvas/resultsTable.svelte";
    import type { CheckResult, FetchResult } from "$lib/api/interfaces";
    import { deleteAllResults, getAllResults, logout } from "$lib/api/api";
    import { onMount } from "svelte";
    import Button, { Label } from "@smui/button";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);

    let results: CheckResult[] = $state([]);
    onMount(() => {
        let res = getAllResults();
        res.then((data: FetchResult<CheckResult[]>) => {
            results = data.result ? data.result : [];
        });
    });
</script>

<div class="wrapper">
    <div class="canvas-column">
        <Canvas bind:r {results} />
    </div>
    <div class="table-column">
        <Table bind:results></Table>
    </div>
    <div class="menu-column">
        <div class="points-form">
            <PointsForm bind:x bind:y bind:r bind:results />
        </div>
        
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        gap: 1rem;
        flex-direction: row;

        @media (max-width: 643px) {
            flex-direction: column;
        }

        @media (min-width: 644px) and (max-width: 1202px) {
            width: 40%;
        }
    }

    .canvas-column {
        flex: 1;
    }

    .menu-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 5rem;
    }
    .table-column {
        flex: 2;
    }

    .manage-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;  
        align-items: center;
    }
</style>
