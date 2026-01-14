<script lang="ts">
  import type { Club } from "$lib/types/placemark-types";
  let { clubs = [] } = $props();
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {#each clubs as club}
      <tr>
        <td>{club.name}</td>
        <td>{club.description}</td>
        <td>{club.category}</td>
      </tr>
    {/each}
  </tbody>
</table>