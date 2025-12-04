<script>
    import { register, login } from "$lib/api/api";
    import TextInputField from "./inputs/textInputField.svelte";
    import Button, { Label } from "@smui/button";

    let username = $state("");
    let password = $state("");
    let errorMessage = $state("");

    function loginUser() {
        let result = login({ username: username, password: password });
        result.then((result) => {
            if (result.result) {
                let token = result.result.access_token;
                let tokenType = result.result.token_type;

                localStorage.setItem("access_token", token ?? "");
                localStorage.setItem("token_type", tokenType ?? "");
                window.location.href = "/canvas"
            } else if (result.error){
                errorMessage = result.error.error_message;
            } else {
                errorMessage = "Failed to create request"
            }
        });
    }
</script>

<form>
    <div class="title">
        <h1>Sign in</h1>
    </div>
    <div class="fields">
        <TextInputField bind:value={username} label="Name"></TextInputField>
        <TextInputField bind:value={password} label="Password" type="password"
        ></TextInputField>
        <p>{errorMessage}</p>
    </div>
    <div class="buttons">
        <Button
            variant="raised"
            onclick={() => {
                loginUser();
            }}
        >
            <Label>Sign in</Label>
        </Button>
    </div>
</form>

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
</style>
