<script lang="ts">
    import Canvas from "$lib/components/canvas/canvas.svelte";
    import PointsForm from "$lib/components/forms/pointsForm.svelte";
    import Table from "$lib/components/resultsTable.svelte";
    import type { CheckResult, FetchResult } from "$lib/api/interfaces";
    import { logout } from "$lib/api/userApi";
    import { onMount } from "svelte";
    import Button, { Label } from "@smui/button";
    import ResultsPlanes from "$lib/components/resultsPlanes.svelte";
    import Header from "$lib/components/header.svelte";
    import { getAllResults } from "$lib/api/resultsApi";
    import { FlatToast, ToastContainer, toasts } from "svelte-toasts";

    let x = $state(0);
    let y = $state(0);
    let r = $state(1);
    let isPollingActive = $state(true);

    let results: CheckResult[] = $state([]);
    onMount(() => {
        pollingResults();
    });

    async function pollingResults() {
        try {
            const data = await getAllResults();

            if (data.error === null) {
                results = data.result ? data.result : [];
            } else if (data.error.status_code !== 304) {
                isPollingActive = false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
        if (isPollingActive === true) {
            setTimeout(pollingResults, 5000);
        }
    }
</script>

<Header></Header>
<div class="wrapper">
    <div class="canvas-column">
        <Canvas bind:r {results} />
    </div>
    <div class="table-column">
        <div class="table-display">
            <Table bind:results></Table>
        </div>
        <div class="plane-display">
            <ResultsPlanes bind:results></ResultsPlanes>
        </div>
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
        margin-top: 3rem;

        @media (max-width: 643px) {
            flex-direction: column;
            margin-top: 0;
        }

        @media (min-width: 644px) and (max-width: 1202px) {
            flex-direction: column;
        }
    }

    .table-display {
        @media (max-width: 643px) {
            display: none;
        }
    }

    .plane-display {
        @media (min-width: 644px) {
            display: none;
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
