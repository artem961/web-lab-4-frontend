<script>
    import { register, login } from "$lib/api/api";
    import TextInputField from "./inputs/textInputField.svelte";
    import Button, { Label } from "@smui/button";

    let username = $state("");
    let password = $state("")

    function loginUser(){
        let result = login({username: username, password: password});
        result
        .then((result) => {
            let token = result.result?.access_token;
            let tokenType = result.result?.token_type;

            localStorage.setItem("access_token", token??"");
            localStorage.setItem("token_type", tokenType??"");
        })
        
    }

</script>


<form>
    <div class="title">
        <h1>Войти</h1>
    </div>
    <div class="fields">
        <TextInputField bind:value={username} label="Имя"></TextInputField>
        <TextInputField bind:value={password} label="Пароль" type="password"></TextInputField>
    </div>
    <div class="buttons">
        <Button variant="raised" onclick={() => {loginUser()}}>
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
