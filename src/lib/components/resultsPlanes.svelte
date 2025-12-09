<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import ResultPlane from "./resultPlane.svelte";

    let { results = $bindable() }: { results: CheckResult[] } = $props();
</script>

<div class="table-wrapper">
    <DataTable stickyHeader table$aria-label="People list" style="width: 100%">
        <Head>
            <Row>
                <Cell>Results</Cell>
            </Row>
        </Head>
        <Body>
            {#each results as row, index}
                <Row>
                    <Cell><ResultPlane result={row} {index}></ResultPlane></Cell
                    >
                </Row>
            {/each}
        </Body>
    </DataTable>
</div>

<style>
    .table-wrapper {
        width: 100%;

        height: 80vh;
        overflow-y: auto;
    }
</style>
