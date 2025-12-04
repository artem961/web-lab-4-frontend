<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  const headers = ["x", "y", "r", "Результат", "Время вычисления", "Время"];

  let { tableData }: { tableData: CheckResult[] } = $props();
</script>

<DataTable table$aria-label="People list" style="max-width: 100%;">
  <Head>
    <Row>
      {#each headers as header}
        <Cell>{header}</Cell>
      {/each}
    </Row>
  </Head>
  <Body>
    {#each tableData as row}
      <Row>
        <Cell>{row.x}</Cell>
        <Cell>{row.y}</Cell>
        <Cell>{row.r}</Cell>
        <Cell>{row.result}</Cell>
        <Cell>{row.time}</Cell>
        <Cell>{row.current_time}</Cell>
      </Row>
    {/each}
  </Body>
</DataTable>
