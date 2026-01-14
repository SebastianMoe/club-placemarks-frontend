<script lang="ts">
  export let clubs = [
    {
      name: "Tramore Surf Club",
      category: "Sport",
      description: "Surfing in Tramore",
      lat: "52.161290",
      lng: "-7.51540"
    },
    {
      name: "Waterford Nature Group",
      category: "Nature",
      description: "Exploring nature in Waterford",
      lat: "52.261290",
      lng: "-7.231540"
    },
    {
      name: "Dungarvan Tech Meetup",
      category: "Tech",
      description: "Tech talks and networking",
      lat: "52.361290",
      lng: "-7.241540"
    }
  ];
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Club Name</th>
      <th>Category</th>
      <th>Description</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    {#each clubs as club}
      <tr>
        <td>
          {club.name}
        </td>
        <td>
          {club.category}
        </td><td>
          {club.description}
        </td>
        <td>
            {club.lat}, {club.lng}
        </td>
      </tr>
    {/each}
  </tbody>
</table>
