<script lang="ts">
  import type { User } from "$lib/types/placemark-types";
  
  let { users = [] } = $props();
</script>

<table class="table is-fullwidth is-striped">
  <thead>
    <tr>
      <th>Vorname</th>
      <th>Nachname</th>
      <th>Email</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td class="is-size-7 has-text-grey">{user._id}</td>
      </tr>
    {/each}
  </tbody>
</table>