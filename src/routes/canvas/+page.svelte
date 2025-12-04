<script lang="ts">
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";
    import Table from "$lib/components/canvas/resultsTable.svelte";
    import type { CheckResult } from "$lib/api/interfaces";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);

    let tableResults: CheckResult[] =$state([{
                "x": 1,
                "y": 2,
                "r": 3,
                "result": true,
                "time": "1488",
                "current_time": "12:00"
            }]);
</script>

<div class="wrapper">
    <div class="canvas-column">
        <Canvas bind:r results={tableResults}/>
    </div>
    <div class="table-column">
        <Table
            tableData={tableResults}
        ></Table>
    </div>
    <div class="menu-column">
        <PointsForm bind:x bind:y bind:r results={tableResults}/>
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
