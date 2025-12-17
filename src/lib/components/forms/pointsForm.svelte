<script lang="ts">
    import NumberInputField from "./inputs/numberInputField.svelte";
    import InputButton from "./inputs/inputButton.svelte";
    import Button, { Group, Label } from "@smui/button";
    import InputButtonsGroup from "./inputs/inputButtonsGroup.svelte";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import { checkHit, deleteAllResults } from "$lib/api/resultsApi";
    import { toasts } from "svelte-toasts";
    import Dialog, { Title } from "@smui/dialog";
    import { Actions, Content } from "@smui/card";

    let {
        x = $bindable(),
        y = $bindable(),
        r = $bindable(),
        results = $bindable(),
    } = $props();

    let valid = $state(false);

    async function sendPoint() {
        let res = await checkHit({ x, y, r });

        if (res.result) {
            results.push(res.result);
        }
    }

    let open = $state(false);
    let count = $derived.by(()=>{
        if (open === true){
            let user = JSON.parse(localStorage.getItem("user"));
            return results.filter(
                    (element) => element.user.username === user.username,
                ).length;
        }
    })
</script>

<Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
>
    <Title id="simple-title">Delete all your results?</Title>
    <Content id="simple-content">You have {count} results</Content>
    <Actions>
        <Button variant="raised" onclick={()=>{open=false}}>
            <Label>No</Label>
        </Button>
        <Button
            variant="outlined"
            onclick={() => {
                deleteAllResults();

                let user = JSON.parse(localStorage.getItem("user"));

                
                toasts.success("Delete " + $state.snapshot(count) + " results")
                results = results.filter(
                    (element) => element.user.username !== user.username,
                );
                
                open=false
            }}
        >
            <Label>Yes</Label>
        </Button>
    </Actions>
</Dialog>

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
            {#if !valid}
                <Tooltip yPos="above" xPos="end">Enter correct values</Tooltip>
            {/if}
        </Wrapper>
    </div>
    <div class="manage-buttons">
        <Wrapper>
            <Button
                variant="outlined   "
                onclick={() => {
                    open = true;
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
