<script lang="ts">
  import type { User } from "$lib/types/placemark-types";
  import { placemarkService } from "$lib/services/placemark-service";
  
  let { users = $bindable([]) } = $props();

  async function deleteUser(id: string) {
    const success = await placemarkService.deleteUser(id);
    if (success) {
      users = users.filter((user) => user._id !== id);
    }
  }
</script>

<table class="table is-fullwidth is-striped">
  <thead>
    <tr>
      <th>Vorname</th>
      <th>Nachname</th>
      <th>Email</th>
      <th>ID</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td class="is-size-7 has-text-grey">{user._id}</td>
        <td>
          <button class="button is-danger is-small" onclick={() => deleteUser(user._id)}>
            <span class="icon is-small">
              <i class="fas fa-trash"></i>
            </span>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>