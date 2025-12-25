<script>
    import { register } from "$lib/api/userApi";
    import Tooltip, { Wrapper } from "@smui/tooltip";
    import TextInputField from "./inputs/textInputField.svelte";
    import Button, { Label } from "@smui/button";
    import Header from "../header.svelte";

    let username = $state("");
    let password = $state("");
    let passwordRetype = $state("");
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
        if (passwordRetype !== "" && password !== passwordRetype) {
            return "Passwords don't match";
        }

        if (password === "") {
            return "Password is empty";
        }

        if (password.length < 5) {
            return "Password is too short";
        }

        if (password.length > 30) {
            return "Paswword is too long";
        }
    });

    let retypePasswordValidation = $derived.by(() => {
        if (passwordRetype === "") {
            return "Retype password";
        }

        if (password !== passwordRetype) {
            return "Passwords don't match";
        }

        if (password.length > 30) {
            return "Paswword is too long";
        }
    });

    let valid = $derived(
        passwordValidation === undefined &&
            usernameValidation === undefined &&
            retypePasswordValidation === undefined,
    );

    function regUser() {
        if (!valid) {
            errorMessage = "Input data is invalid!";
            return;
        }

        let result = register({ username: username, password: password });
        result.then((result) => {
            if (result.result) {
                window.location.href = "/";
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
        <h1>Registration</h1>
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

            <TextInputField
                bind:value={passwordRetype}
                label="Retype password"
                type="password"
                errorText={retypePasswordValidation}
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
                        regUser();
                    }}
                    disabled={!valid}
                >
                    <Label>Sign up</Label>
                </Button>
            </div>
            {#if !valid}
                <Tooltip yPos="above" xPos="end">Enter correct values</Tooltip>
            {/if}
        </Wrapper>
    </div>
</form>

<style>
    form {
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;

        margin-top: 4rem;   

        @media (max-height: 650px) {
            gap: 0;
        }

        @media (max-width: 643px) {
            gap: 1rem;
            margin-top: 0;
        }

          @media (min-width: 644px) and (max-width: 1202px) {
           margin-top: 2rem;
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

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
</style>
