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
                window.location.href = "/canvas";
            } else if (result.error) {
                errorMessage = result.error.error_message;
            } else {
                errorMessage = "Failed to create request";
            }
        });
    }
</script>

<form>
    <div class="title">
        <h1>Sign in</h1>
    </div>
    <div class="fields">
        <div class="inputs">
            <TextInputField bind:value={username} label="Name"></TextInputField>
            <TextInputField
                bind:value={password}
                label="Password"
                type="password"
            ></TextInputField>
        </div>
        <div class="error-message">
            <p>{errorMessage}</p>
        </div>
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
        <Button
            variant="link"
            onclick={() => {
                window.location.href = "/registration";
            }}
        >
            <Label>Registration</Label>
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
        width: 25%;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .error-message{
        text-align: center;
    }
</style>
