<script>
    import { Group } from "@smui/button";
    import InputButton from "./inputButton.svelte";

    let  {valueForUpdate=$bindable(), rangeOfValues, columns, onSelectExecuteFunction=()=>{}} = $props();

    let rows = [];
    for (let i = 0; i < rangeOfValues.length; i+=columns){
        rows.push(i)
    }
</script>

<div class="buttons">
    {#each rows as row}
        <div class="buttons-row">
            <Group variant="outlined">
                {#each rangeOfValues.slice(row, row + columns) as val}
                    <InputButton
                        label={val}
                        variant="outlined"
                        onclick={() => {
                            valueForUpdate=val;
                            onSelectExecuteFunction(val);
                        }}
                        style={valueForUpdate===val?"background-color: #23303D; color:grey":""}
                    ></InputButton>
                {/each}
            </Group>
        </div>
    {/each}
</div>

<style>
    .button-row{
    }
</style>