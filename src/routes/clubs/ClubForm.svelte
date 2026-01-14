<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club } from "$lib/types/placemark-types";
    import { goto } from "$app/navigation"; // Optional: Zum Navigieren nach dem Erstellen

    let name = $state("");
    let description = $state("");
    let category = $state("other");
    let lat = $state(0.0);
    let lng = $state(0.0);

    let categories = ["education", "sports", "music", "rescue", "other"];

    async function createClub() {
        const newClub: Club = {
            name: name,
            description: description,
            category: category,
            latitude: lat,
            longitude: lng
        };
        
        const success = await placemarkService.createClub(newClub);
        if (success) {
            console.log("Club created successfully");
            // Optional: Zur Liste navigieren
            goto("/allclubs"); 
        } else {
            console.log("Error creating club");
        }
    }
</script>

<form onsubmit={(e) => { e.preventDefault(); createClub(); }}>
  <div class="field">
    <label class="label" for="name">Name</label>
    <input bind:value={name} class="input" id="name" type="text" required />
  </div>
  <div class="field">
    <label class="label" for="description">Description</label>
    <input bind:value={description} class="input" id="description" type="text" />
  </div>
  <div class="field">
    <label class="label" for="category">Category</label>
    <div class="select">
      <select bind:value={category} id="category">
        {#each categories as c}
          <option value={c}>{c}</option>
        {/each}
      </select>
    </div>
  </div>
  
  <Coordinates bind:lat bind:lng />

  <div class="field">
    <button class="button is-primary">Create Club</button>
  </div>
</form>