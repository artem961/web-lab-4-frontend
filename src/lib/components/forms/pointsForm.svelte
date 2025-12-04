<script lang="ts">
    import NumberInputField from "./inputs/numberInputField.svelte";
    import InputButton from "./inputs/inputButton.svelte";
    import Button, { Group, Label } from "@smui/button";
    import InputButtonsGroup from "./inputs/inputButtonsGroup.svelte";
    import { checkHit } from "$lib/api/api";

    let {
        x = $bindable(),
        y = $bindable(),
        r = $bindable(),
        results,
    } = $props();

    function sendPoint() {
        let res = checkHit({ x: x, y: y, r: r });

        res.then((result) => {
            if (result.result) {
                results.push({
                    x: result.result.x,
                    y: result.result.y,
                    r: result.result.r,
                    result: result.result.result,
                    time: result.result.time,
                    current_time: result.result.current_time,
                });
            }
        });
    }
</script>

<div class="wrapper">
    <form>
        <p>Выбрана точка x: {x} y: {y}</p>
        <div class="title">
            <h1>Выбор точки</h1>
        </div>
        <div class="fields">
            <div class="x-buttons">
                <InputButtonsGroup
                    rangeOfValues={[-4, -3, -2, -1, 0, 1, 2, 3, 4]}
                    columns={3}
                    onSelectExecuteFunction={(value: number) => {
                        x = value;
                    }}
                ></InputButtonsGroup>
            </div>

            <NumberInputField
                variant="outlined"
                bind:value={y}
                label="Y"
                helperText="от -3 до 3"
                min={-3}
                max={3}
            ></NumberInputField>
        </div>
        <div class="buttons">
            <Button
                variant="raised"
                onclick={() => {
                    sendPoint();
                }}
            >
                <Label>Отправить</Label>
            </Button>
        </div>
    </form>
</div>

<style>
    form {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
    }

    .fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: center;
    }

    .buttons {
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        width: 100%;
    }

    .x-buttons {
    }
    .x-buttons-row {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>
