<script lang="ts">
  import type { Club } from "$lib/types/placemark-types";
  
  let { clubs = [], deleteClub = (id: string) => {} } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Category</th>
      <th>Action</th> </tr>
  </thead>
  <tbody>
    {#each clubs as club}
      <tr>
        <td>
          <a href="/club/{club._id}" class="has-text-weight-bold">
            {club.name}
          </a>
        </td>
        <td>{club.description}</td>
        <td>{club.category}</td>
        <td>
          <a href="/club/{club._id}" class="button is-info is-small" title="Open">
            <span class="icon is-small"><i class="fas fa-folder-open"></i></span>
          </a>
          <button class="button is-danger is-small" onclick={() => deleteClub(club._id!)} title="Delete">
            <span class="icon is-small"><i class="fas fa-trash"></i></span>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>