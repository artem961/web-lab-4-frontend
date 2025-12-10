<script lang="ts">
    import type { CheckResult } from "$lib/api/interfaces";
    import Card, { Content } from "@smui/card";
    import List, { Item, Label, Text } from "@smui/list";

    let { result }: { result: CheckResult | undefined } = $props();

    let dateOptions = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
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
                    <Item style="gap: 0.3rem">
                        <Label>{"Result:"}</Label><Label
                            style={"color: " +
                                (result.result
                                    ? "rgb(92, 179, 116)"
                                    : "rgb(214, 97, 95)")}
                            >{result.result}</Label
                        ></Item
                    >
                    <Item>Computing: {result.time}</Item>
                    <Item
                        >Time: {new Intl.DateTimeFormat(
                            "de-DE",
                            dateOptions,
                        ).format(new Date(result.currentTime))}</Item
                    >
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
