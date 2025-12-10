<script>
    import config from "$lib/app-config.json";
    import duck from "$lib/assets/duck.png";

    let user = $state();
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
                <div class="user-name">user</div>
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

    }

    .logo-block {
        display: flex;
        align-items: center;
        gap: 15px;

         @media (max-height: 650px) {
            display: none;
        }
    }

    .logo-icon {
        max-block-size: 3rem;
        border-radius: 8px;

        @media (max-width: 643px) {
            display: none;
        }
    }

    .logo-block h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 700;
        color: #4fc3f7;

        @media (max-width: 643px) {
            font-size: 1.3rem;
        }
    }

    .logo-block h6 {
        margin: 0;
        font-weight: 700;
        color: #3f4a55;
        @media (max-width: 643px) {
            font-size: 0.5rem;
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
        transition: all 0.2s ease;

         @media (max-height: 650px) {
            display: none;
        }
    }

    .user-block:hover {
        background: rgba(129, 212, 250, 0.2);
        border-color: #4fc3f7;
    }

    .user-data {
        text-align: right;
    }

    .user-name {
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 2px;
        color: #81d4fa;
    }

    .user-icon {
        font-size: 1.5rem;
        padding: 8px;
        border-radius: 50%;
        background: rgba(79, 195, 247, 0.1);
        color: #4fc3f7;
    }
</style>
