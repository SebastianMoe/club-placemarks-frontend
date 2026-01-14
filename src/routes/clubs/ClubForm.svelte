<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";

    let lat = $state(52.160858);
    let lng = $state(-7.15242);
    let clubName = $state("");
    let description = $state("");
    let categories = ["Sport", "Nature", "Music", "Tech"];
    let selectedCategory = $state("Sport");

    async function addClub() {
        console.log(`New club: ${clubName} (${selectedCategory}) - ${description}`);
        console.log(`lat: ${lat}, lng: ${lng}`);
    }
</script>

<div>
  <div class="field">
    <label class="label" for="clubName">Club Name:</label>
    <input bind:value={clubName} class="input" id="clubName" name="clubName" type="text" placeholder="Enter club name" />
  </div>
  <div class="field">
    <label class="label" for="category">Select Category:</label>
    <div class="control">
      {#each categories as category}
        <input bind:group={selectedCategory} class="radio" type="radio" value={category} /> {category}
      {/each}
    </div>
  </div>
  <div class="field">
    <label class="label" for="description">Description:</label>
    <input bind:value={description} class="input" id="description" name="description" type="text" placeholder="Enter description" />
  </div>
  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button onclick={addClub} class="button is-link is-fullwidth">Add Club</button>
    </div>
  </div>
</div>
