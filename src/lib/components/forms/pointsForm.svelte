<script lang="ts">
    import NumberInputField from "./inputs/numberInputField.svelte";
    import InputButton from "./inputs/inputButton.svelte";
    import Button, { Group, Label } from "@smui/button";
    import InputButtonsGroup from "./inputs/inputButtonsGroup.svelte";
    import { checkHit, deleteAllResults } from "$lib/api/api";
    import Tooltip, { Wrapper } from "@smui/tooltip";

    let {
        x = $bindable(),
        y = $bindable(),
        r = $bindable(),
        results = $bindable(),
    } = $props();

    let valid = $state(false);

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
        <div class="title">
            <h1>Point selection</h1>
        </div>
        <div class="fields">
            <Label>X</Label>
            <div class="x-buttons">
                <InputButtonsGroup
                    rangeOfValues={[-4, -3, -2, -1, 0, 1, 2, 3, 4]}
                    columns={3}
                    bind:valueForUpdate={x}
                ></InputButtonsGroup>
            </div>
            <Label>Y</Label>

            <NumberInputField
                variant="outlined"
                bind:value={y}
                bind:valid
                label="Y"
                helperText="from -3 to 3"
                min={-3}
                max={3}
            ></NumberInputField>
        </div>
        <div class="buttons">
            <Wrapper>
                <div>
                    <Button
                        variant="raised"
                        onclick={() => {
                            sendPoint();
                        }}
                        disabled={!valid}
                    >
                        <Label>Check</Label>
                    </Button>
                </div>
                <Tooltip yPos="above" xPos="end">Select valid values</Tooltip>
            </Wrapper>
        </div>
        <div class="manage-buttons">
            <Wrapper>
            <Button
                variant="outlined   "
                onclick={() => {
                    deleteAllResults();
                    results = [];
                }}
            >
                <Label>Clear results</Label>
            </Button>
            <Tooltip yPos="above" xPos="end">Delete all results</Tooltip>
            </Wrapper>
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
        padding-left: 1rem;
        padding-right: 1rem;
        border: 3px solid #0a1929;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem;
    }

    .x-buttons {
    }
    .x-buttons-row {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>
