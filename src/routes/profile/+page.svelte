<script lang="ts">
    import { getUserInfo, logout } from "$lib/api/userApi";
    import type { User } from "$lib/api/interfaces";
    import Button, { Label } from "@smui/button";
    import Card, { Actions, Content } from "@smui/card";
    import { onMount } from "svelte";

    let user: User | null | undefined = $state();

    onMount(() => {
        getUserInfo().then((data) => {
            user = data.result;
        });
    });

    function logoutUser() {
        logout();
        window.location.href = "/";
    }
</script>

<div class="card-container">
    <Card>
        <Content>
            <div class="user-info">   
                <Label>Username: {user?.username}</Label>
                <Label>ID: {user?.id}</Label>
            </div>
        </Content>
        <Actions>
            <Button onclick={() => logoutUser()}>
                <Label>Logout</Label>
            </Button>
            <Button onclick={() => window.history.back()} variant="raised">
                <Label>Back</Label>
            </Button>
        </Actions>
    </Card>
</div>

<style>
    .user-info {
        display: flex;
        flex-direction: column;
        gap: 1rem
    }

     .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 1rem;
    }

    
</style>
