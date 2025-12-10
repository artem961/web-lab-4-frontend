<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
    import Card, { Content } from "@smui/card";
    import List, { Item, Text } from "@smui/list";

    let {
        result
    }: { result: CheckResult | undefined} = $props();
</script>

<div class="card-container">
    {#if result !== undefined}
        <Card>
            <div class="plane">
                <Content component={List}>
                    <Item>X: {result.x}</Item>
                    <Item>Y: {result.y}</Item>
                    <Item>R: {result.r}</Item>
                </Content>
                <Content component={List}>
                    <Item>Result: {result.result}</Item>
                    <Item>Computing: {result.time}</Item>
                    <Item>Time: {result.current_time}</Item>
                </Content>
            </div>
        </Card>
    {/if}
</div>

<style>
    .plane {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
