<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
    import Card, { Content } from "@smui/card";
    import List, { Item, Text } from "@smui/list";

    let { result, index = 0 }: { result: CheckResult; index: number } =
        $props();
</script>

<div class="card-container">
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
    
</div>

<style>
    .plane{
        display: flex;
        flex-direction: row;
    }
</style>
