<script lang="ts">
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";
    import Table from "$lib/components/canvas/resultsTable.svelte";
    import type { CheckResult, FetchResult } from "$lib/api/interfaces";
    import { getAllResults } from "$lib/api/api";
    import { onMount } from "svelte";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);

    let results: CheckResult[] =$state([]);
    onMount(()=>{
        let res = getAllResults();
        res
        .then((data: FetchResult<CheckResult[]>) => {
            results = data.result ? data.result : [];
        })
    })
</script>

<div class="wrapper">
    <div class="canvas-column">
        <Canvas bind:r results={results}/>
    </div>
    <div class="table-column">
        <Table
            tableData={results}
        ></Table>
    </div>
    <div class="menu-column">
        <PointsForm bind:x bind:y bind:r results={results}/>
    </div>
</div>

<style>
    .wrapper {
       display: flex;
       flex-direction: row;
       gap: 4rem;
    }

    .canvas-column{
        flex: 1;
    }

    .menu-column{
        flex: 4;
    }
    .table-column{
        flex: 1;
    }
</style>
