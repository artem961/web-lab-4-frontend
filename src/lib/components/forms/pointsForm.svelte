<script lang="ts">
    import NumberInputField from "./inputs/numberInputField.svelte";
    import InputButton from "./inputs/inputButton.svelte";
    import Button, { Group, Label } from "@smui/button";
    import InputButtonsGroup from "./inputs/inputButtonsGroup.svelte";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import { checkHit, deleteAllResults } from "$lib/api/resultsApi";

    let {
        x = $bindable(),
        y = $bindable(),
        r = $bindable(),
        results = $bindable(),
    } = $props();

    let valid = $state(false);

    async function sendPoint() {
        let res = await checkHit({x, y, r});

       if (res.result){
        results.push(res.result);
       };
    }

</script>

<div class="form">
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
            <Tooltip yPos="above" xPos="end">Enter correct values</Tooltip>
        </Wrapper>
    </div>
    <div class="manage-buttons">
        <Wrapper>
            <Button
                variant="outlined   "
                onclick={() => {
                    deleteAllResults();
                    
                    let user = JSON.parse(localStorage.getItem("user"));

                   results = results.filter(element => element.user.username !== user.username);
                }}
            >
                <Label>Clear results</Label>
            </Button>
            <Tooltip yPos="above" xPos="end">Delete all results</Tooltip>
        </Wrapper>
    </div>
</div>

<style>
    .form {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        padding-bottom: 1rem;
        margin-right: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 3px solid #0a1929;
        border-radius: 10px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: center;
    }
</style>
