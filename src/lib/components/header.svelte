<script lang="ts">
    import { getUserInfo } from "$lib/api/api";
    import type { User } from "$lib/api/interfaces";
    import config from "$lib/app-config.json";
    import duck from "$lib/assets/duck.png";
    import { onMount } from "svelte";

    let user: User | null | undefined = $state();
    onMount(() => {
        getUserInfo().then((data) => {
            user = data.result;
            localStorage.setItem("user", JSON.stringify(user));
        });
    });
</script>

<header class="header">
    <div class="logo-block">
        <img src={duck} class="logo-icon" alt="duck logo" />
        <div class="logo">
            <h1>{config.app_name}</h1>
            <h6>by: {config.author_name}</h6>
        </div>
    </div>

    <div
        class="user-block"
        role="button"
        onclick={() => {
            let location = user ? "/profile" : "/";
            window.location.href = location;
        }}
    >
        <div class="user-data">
            {#if user}
                <div class="user-name">{user.username}</div>
            {:else}
                <div class="user-name">Auth</div>
            {/if}
        </div>
        <div class="user-icon">👤</div>
    </div>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: #0a1929;
        border-bottom: 2px solid #4fc3f7;
        transition: all 0.3s ease;
        overflow: hidden;

        @media (max-height: 650px) {
            padding: 0.3rem 2rem;
            max-height: 0;
            opacity: 0;
            border-bottom-width: 0;
        }

        @media (min-height: 650px) {
            max-height: 100px;
            opacity: 1;
        }
    }

    .logo-block {
        display: flex;
        align-items: center;
        gap: 15px;
        transition: all 0.3s ease;
        transform-origin: left center;

        @media (max-height: 650px) {
            transform: scale(0.8);
            opacity: 0.7;
            gap: 8px;
        }
    }

    .logo-icon {
        max-block-size: 3rem;
        border-radius: 8px;
        transition: all 0.3s ease;

        @media (max-width: 643px) {
            display: none;
        }

        @media (max-height: 650px) {
            max-block-size: 2rem;
        }
    }

    .logo-block h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 700;
        color: #4fc3f7;
        transition: all 0.3s ease;

        @media (max-width: 643px) {
            font-size: 1.3rem;
        }

        @media (max-height: 650px) {
            font-size: 1.8rem;
        }
    }

    .logo-block h6 {
        margin: 0;
        font-weight: 700;
        color: #3f4a55;
        transition: all 0.3s ease;

        @media (max-width: 643px) {
            font-size: 0.5rem;
        }

        @media (max-height: 650px) {
            font-size: 0.7rem;
        }
    }

    .logo {
        display: flex;
        flex-direction: column;
        gap: 0rem;
    }

    .user-block {
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 8px;
        background: rgba(129, 212, 250, 0.1);
        border: 1px solid rgba(79, 195, 247, 0.2);
        transition: all 0.3s ease;
        transform-origin: right center;

        @media (max-height: 650px) {
            transform: scale(0.8);
            opacity: 0.7;
            gap: 8px;
            padding: 6px 12px;
        }
    }

    .user-block:hover {
        background: rgba(129, 212, 250, 0.2);
        border-color: #4fc3f7;

        @media (max-height: 650px) {
            transform: scale(0.85);
            opacity: 0.9;
        }
    }

    .user-data {
        text-align: right;
    }

    .user-name {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 2px;
        color: #81d4fa;
        transition: all 0.3s ease;

        @media (max-height: 650px) {
            font-size: 0.85rem;
        }
    }

    .user-icon {
        font-size: 1.5rem;
        padding: 8px;
        border-radius: 50%;
        background: rgba(79, 195, 247, 0.1);
        color: #4fc3f7;
        transition: all 0.3s ease;

        @media (max-height: 650px) {
            font-size: 1.2rem;
            padding: 6px;
        }
    }

    @media (max-width: 643px) {
        .user-block {
            gap: 8px;
            padding: 6px 10px;
        }

        .user-name {
            font-size: 0.85rem;
        }

        .user-icon {
            font-size: 1.1rem;
            padding: 5px;
        }
    }
</style>
