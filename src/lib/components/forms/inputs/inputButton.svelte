<script>
     import Button, { Label } from '@smui/button';
     let {label, ...props} = $props();
</script>

<Button  {...props}>
    <Label>{label}</Label>
</Button>

<style>
    
    
</style>
