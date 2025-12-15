<script>
    import { login } from "$lib/api/userApi";
    import TextInputField from "./inputs/textInputField.svelte";
    import Button, { Label } from "@smui/button";
    import Tooltip, { Wrapper } from "@smui/tooltip";

    let username = $state("");
    let password = $state("");
    let errorMessage = $state("");

    let usernameValidation = $derived.by(() => {
        if (username === "") {
            return "Name is empty";
        }
        if (username.length < 2) {
            return "Name is too short";
        }
        if (username.length > 30) {
            return "Name is too long";
        }
    });

    let passwordValidation = $derived.by(() => {
        if (password === "") {
            return "Password is empty";
        }
        if (password.length < 5) {
            return "Password is too short";
        }
        if (password.length > 30) {
            return "Pawword is too long";
        }
    });

    let valid = $derived(
        passwordValidation === undefined && usernameValidation === undefined,
    );

    function loginUser() {
        if (!valid) {
            errorMessage = "Input data is invalid!";
            return;
        }

        let result = login({ username: username, password: password });
        result.then((result) => {
            if (result.result) {
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
            <TextInputField
                bind:value={username}
                label="Name"
                errorText={usernameValidation}
            ></TextInputField>

            <TextInputField
                bind:value={password}
                label="Password"
                type="password"
                errorText={passwordValidation}
            ></TextInputField>
        </div>
        <div class="error-message">
            <Label>{errorMessage}</Label>
        </div>
    </div>
    <div class="buttons">
        <Wrapper>
            <div>
                <Button
                    variant="raised"
                    onclick={() => {
                        loginUser();
                    }}
                    disabled={!valid}
                    style="width: 100%"
                >
                    <Label>Sign in</Label>
                </Button>
            </div>
            {#if !valid}
                <Tooltip yPos="above" xPos="end">Enter correct values</Tooltip>
            {/if}
        </Wrapper>
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

        @media (max-height: 650px) {
            gap: 0;
        }

        @media (max-width: 643px) {
            gap: 1rem;
        }
    }

    .fields {
        display: flex;
        flex-direction: column;
        width: 25%;

        @media (max-width: 643px) {
            width: 80%;
        }

        @media (min-width: 644px) and (max-width: 1202px) {
            width: 40%;
        }
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

    .error-message {
        text-align: center;
        height: 24px;
        margin-top: 4px;
        color: #d32f2f;
    }
</style>
