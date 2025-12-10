<script>
    import { logout } from "$lib/api/api";
    import Button from "@smui/button";

    function logout_user(){
        logout();
        window.location.href="/"
    }

</script>
<Button onclick={()=>{logout_user()}} variant="raised">Logout</Button>