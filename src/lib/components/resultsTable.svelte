<script lang="ts">
  import type { CheckResult } from "$lib/api/interfaces";
  import { deleteResultById } from "$lib/api/resultsApi";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import ResultPlane from "./resultPlane.svelte";
  import NumberInputField from "./forms/inputs/numberInputField.svelte";
  import { toasts } from "svelte-toasts";
  import DeleteResultDialog from "./utils/deleteResultDialog.svelte";

  const headers = [
    "ID",
    "Result",
    "x",
    "y",
    "r",
    "Computing time",
    "Time",
    "User",
  ];

  let { results = $bindable() }: { results: CheckResult[] } = $props();

  let dateOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  let open = $state(false);
  let selectedResult: CheckResult | undefined = $state();
</script>

<DeleteResultDialog bind:open bind:results bind:selectedResult
></DeleteResultDialog>

<div class="table-wrapper">
  <DataTable stickyHeader table$aria-label="People list" style="width: 100%">
    <Head>
      <Row>
        {#each headers as header}
          <Cell>{header}</Cell>
        {/each}
      </Row>
    </Head>
    <Body>
      {#each results as row}
        <Row
          onclick={() => {
            selectedResult = row;
            open = true;
          }}
        >
          <Cell>{row.id}</Cell>
          <Cell
            style={"color: " +
              (row.result ? "rgb(92, 179, 116)" : "rgb(214, 97, 95)")}
            >{row.result}</Cell
          >
          <Cell>{row.x}</Cell>
          <Cell>{row.y}</Cell>
          <Cell>{row.r}</Cell>
          <Cell>{row.time}</Cell>
          <Cell
            >{new Intl.DateTimeFormat("de-DE", dateOptions).format(
              new Date(row.currentTime),
            )}</Cell
          >
          <Cell>{row.user.username}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
</div>

<style>
  .table-wrapper {
    width: 100%;

    height: 70vh;
    @media (min-width: 644px) and (max-width: 1202px) {
      height: 30vh;
    }
    overflow-y: auto;
  }
</style>
