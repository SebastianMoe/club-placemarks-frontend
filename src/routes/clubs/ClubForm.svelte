<script lang="ts">
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import { goto } from "$app/navigation";

    let name = $state("");
    let description = $state("");
    let category = $state("other");
    let lat = $state(0.0);
    let lng = $state(0.0);
    let fileName = $state("");
    let files: FileList | null = $state(null); 

    let categories = ["education", "sports", "music", "rescue", "other"];

    async function createClub() {
        const success = await placemarkService.createClubWithImage(
            name, 
            description, 
            category, 
            lat, 
            lng, 
            files ? files[0] : null 
        );
        
        if (success) {
            console.log("Club created successfully");
            goto("/allclubs"); 
        } else {
            console.log("Error creating club");
        }
    }

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            fileName = input.files[0].name;
            files = input.files;
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
    <input bind:value={description} class="input" id="description" type="text" required />
  </div>

  <div class="field">
    <label class="label" for="category">Category</label>
    <div class="control">
      <div class="select">
        <select bind:value={category} id="category">
          {#each categories as c}
            <option value={c}>{c}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  
  <div class="field">
    <label class="label" for="file">Club Image</label>
    <div class="file has-name is-fullwidth">
      <label class="file-label">
        <input 
            class="file-input" 
            type="file" 
            accept="image/png, image/jpeg" 
            name="resume" 
            onchange={handleFileChange}
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Choose a file… </span>
        </span>
        <span class="file-name"> {fileName} </span>
      </label>
    </div>
  </div>

  <Coordinates bind:lat bind:lng />

  <div class="field">
    <button class="button is-primary">Create Club</button>
  </div>
</form>