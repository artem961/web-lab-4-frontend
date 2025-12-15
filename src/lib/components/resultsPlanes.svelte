<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
    import { derived } from "svelte/store";
    import ResultPlane from "./resultPlane.svelte";
    import Button, { Label } from "@smui/button";
    import DeleteResultDialog from "./utils/deleteResultDialog.svelte";

    let { results = $bindable() }: { results: CheckResult[] } = $props();
    let index = $state(0);

    function correctIndex() {
        if (index > results.length - 1) {
            index = 0;
        }
        if (index < 0) {
            index = results.length - 1;
        }
    }

    $effect(() => {
        if (results) {
            correctIndex();
        }
    });

    let open = $state(false);
    let selectedResult = $derived.by(() => {
        return results.at(index);
    });
</script>

<DeleteResultDialog bind:open bind:results bind:selectedResult
></DeleteResultDialog>

<div class="table-wrapper">
    <div class="menu">
        {#if results.length === 0}
            <Label style="font-size: 1.5rem; font-weight:500">No results</Label>
        {:else}
            <Button
                onclick={() => {
                    index -= 1;
                    correctIndex();
                }}>{"◀"}</Button
            >
            <Label style="font-size: 1.5rem; font-weight:500"
                >{index + 1 + " / " + results.length}</Label
            >
            <Button
                onclick={() => {
                    index += 1;
                    correctIndex();
                }}>{"▶"}</Button
            >
        {/if}
    </div>
    <div
        onclick={() => {
            open = true;
        }}
    >
        <ResultPlane result={results.at(index)}></ResultPlane>
    </div>
</div>

<style>
    .table-wrapper {
        width: 100%;
    }

    .menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
