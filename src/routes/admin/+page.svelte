<script lang="ts">
  import { onMount } from "svelte";
  import UserList from "$lib/ui/UserList.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { User } from "$lib/types/placemark-types";

  let users: User[] = $state([]);

  onMount(async () => {
    users = await placemarkService.getUsers();
  });
</script>

<h1 class="title is-4">Admin Dashboard - Alle Benutzer</h1>
<UserList bind:users={users} />