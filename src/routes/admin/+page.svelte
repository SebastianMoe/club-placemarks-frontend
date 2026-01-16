<script lang="ts">
  import { onMount } from "svelte";
  import UserList from "$lib/ui/UserList.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User } from "$lib/types/placemark-types";
  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";

  let users: User[] = $state([]);

  onMount(async () => {
    if (loggedInUser.role !== "admin") {
        goto("/dashboard");
        return;
    }
    users = await placemarkService.getUsers();
  });
</script>

{#if loggedInUser.role === "admin"}
    <h1 class="title is-4">Admin Dashboard</h1>
    <UserList {users} />
{:else}
    <p>No permission.</p>
{/if}