<script lang="ts">
    import Dialog, { Actions, Content, Title } from "@smui/dialog";
    import ResultPlane from "../resultPlane.svelte";
    import Button, { Label } from "@smui/button";
    import { deleteResultById } from "$lib/api/resultsApi";
    import { toasts } from "svelte-toasts";
    import type { CheckResult, User } from "$lib/api/interfaces";
    import { onMount } from "svelte";

    let {
        results = $bindable(),
        selectedResult = $bindable(),
        open = $bindable(false),
    }: {
        results: CheckResult[];
        selectedResult: CheckResult;
        open: boolean;
    } = $props();

    function deleteResults(id: number) {
        let result = deleteResultById(id);
        result.then((res) => {
            if (res.error) {
                toasts.error(res.error.error_message);
            } else {
                toasts.success(
                    "Result with id " + selectedResult?.id + " deleted",
                );

                results = results.filter(
                    (result) => result.id !== selectedResult?.id,
                );
            }
        });
    }

    let user: User;
    let blockButton: boolean = $derived.by(() => {
        try {
            if (typeof localStorage === "undefined") return false;

            const userData = localStorage.getItem("user");
            if (!userData || !selectedResult) return false;

            const localUser = JSON.parse(userData);
            return localUser && localUser.id !== selectedResult.user.id;
        } catch {
            return false;
        }
    });
</script>

<Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
>
    <Title id="simple-title">Result {selectedResult?.id}</Title>
    <Content id="simple-content">
        <ResultPlane result={selectedResult}></ResultPlane>
    </Content>
    <Actions>
        <Button variant="raised">
            <Label>Close</Label>
        </Button>
        <Button
            variant="outlined"
            onclick={() => deleteResults(selectedResult?.id)}
            disabled={blockButton}
        >
            <Label>Delete</Label>
        </Button>
    </Actions>
</Dialog>
