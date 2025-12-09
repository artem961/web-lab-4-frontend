<script lang="ts">
  import type { CheckResult } from "$lib/api/interfaces";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  const headers = [
    "№",
    "Result",
    "x",
    "y",
    "r",
    "Computing time",
    "Time",
  ];

  let { results=$bindable() }: { results: CheckResult[] } = $props();
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
          <Cell>{row.result}</Cell>
          <Cell>{row.x}</Cell>
          <Cell>{row.y}</Cell>
          <Cell>{row.r}</Cell>
          <Cell>{row.time}</Cell>
          <Cell>{row.current_time}</Cell>
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
