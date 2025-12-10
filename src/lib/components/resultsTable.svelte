<script lang="ts">
  import type { CheckResult } from "$lib/api/interfaces";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  const headers = ["№", "Result", "x", "y", "r", "Computing time", "Time"];

  let { results = $bindable() }: { results: CheckResult[] } = $props();

  let dateOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
</script>

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
      {#each results as row, index}
        <Row>
          <Cell>{index + 1}</Cell>
          <Cell style={"color: " + (row.result?"rgb(92, 179, 116)": "rgb(214, 97, 95)")}>{row.result}</Cell>
          <Cell>{row.x}</Cell>
          <Cell>{row.y}</Cell>
          <Cell>{row.r}</Cell>
          <Cell>{row.time}</Cell>
          <Cell
            >{new Intl.DateTimeFormat("de-DE", dateOptions).format(
              new Date(row.currentTime),
            )}</Cell
          >
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
