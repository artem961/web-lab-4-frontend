<script>
    import NumberInputField from "./inputs/numberInputField.svelte";
    import InputButton from "./inputs/inputButton.svelte";
    import Button, { Group, Label } from "@smui/button";

    let xValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    let x = $state(0);
    let y = $state(0);
    let r = $state(0);
</script>

<div class="wrapper">
    <form>
        <p>Выбрана точка x: {x} y: {y}</p>
        <div class="title">
            <h1>Выбор точки</h1>
        </div>
        <div class="fields">
            <div class="x-buttons">
                {#each [0, 1, 2] as row}
                    <div class="x-buttons-row">
                        <Group variant="outlined">
                            {#each xValues.slice(row * 3, row * 3 + 3) as xVal}
                                <InputButton
                                    label={xVal}
                                    variant="outlined"
                                    onclick={() => {
                                        x = xVal;
                                    }}
                                ></InputButton>
                            {/each}
                        </Group>
                    </div>
                {/each}
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
            <Button variant="raised">
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
    }

    .fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 25%;
    }

    .buttons {
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .x-buttons {
    }
    .x-buttons-row {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>
