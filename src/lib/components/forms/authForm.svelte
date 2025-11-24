<script>
    import TextInputField from "./inputs/textInputField.svelte";
    import Button, { Label } from "@smui/button";
</script>


<form>
    <div class="title">
        <h1>Войти</h1>
    </div>
    <div class="fields">
        <TextInputField value="" label="Имя"></TextInputField>
        <TextInputField value="" label="Пароль" type="password"
        ></TextInputField>
    </div>
    <div class="buttons">
        <Button variant="raised">
            <Label>Войти</Label>
        </Button>
    </div>
</form>

<style>
    form {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 2rem
        
    }

    .fields {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 25%;
    }

    .buttons {

    }
</style>
