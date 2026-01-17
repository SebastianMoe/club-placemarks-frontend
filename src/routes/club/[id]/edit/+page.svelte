<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import type { Club } from "$lib/types/placemark-types";
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let club: Club | null = $state(null);
  let files: FileList | null = $state(null);
  let fileName = $state("");
  let categories = ["education", "sports", "music", "rescue", "other"];

  onMount(async () => {
    if ($page.params.id) {
      club = await placemarkService.getClub($page.params.id);
    }
  });

  async function updateClub() {
    if (club) {
        const success = await placemarkService.updateClub(
            club._id!, club.name, club.description, club.category, 
            club.latitude, club.longitude, files
        );
        if (success) {
            goto(`/club/${club._id}`); 
        }
    }
  }

  async function deleteImage(url: string) {
    if (club && confirm("Delete this image?")) {
        const success = await placemarkService.deleteClubImage(club._id!, url);
        if (success) {
            club.imageUrls = club.imageUrls!.filter(img => img !== url);
        }
    }
  }

  async function deleteClub() {
    if (club && confirm("Really delete this whole club?")) {
        const success = await placemarkService.deleteClub(club._id!);
        if (success) {
            goto("/allclubs");
        }
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        files = input.files;
        fileName = `${input.files.length} new files selected`;
    }
  }
</script>

{#if club}
  <div class="box">
    <h1 class="title">Edit Club: {club.name}</h1>

    <form onsubmit={(e) => { e.preventDefault(); updateClub(); }}>
      <div class="field">
        <label class="label">Name</label>
        <input bind:value={club.name} class="input" type="text" required />
      </div>
      <div class="field">
        <label class="label">Description</label>
        <input bind:value={club.description} class="input" type="text" />
      </div>
      <div class="field">
        <label class="label">Category</label>
        <div class="select">
          <select bind:value={club.category}>
            {#each categories as c}
              <option value={c}>{c}</option>
            {/each}
          </select>
        </div>
      </div>

      <Coordinates bind:lat={club.latitude} bind:lng={club.longitude} />

      <div class="box">
        <label class="label">Manage Images</label>
        
        <div class="columns is-multiline">
            {#each (club.imageUrls ?? []) as img}
                <div class="column is-3 has-text-centered">
                    <figure class="image is-4by3">
                        <img src={img} alt="Club Img" style="object-fit: cover; border-radius: 4px;">
                    </figure>
                    <button type="button" class="button is-danger is-small is-outlined mt-2" onclick={() => deleteImage(img)}>
                        <span class="icon"><i class="fas fa-trash"></i></span>
                        <span>Delete Image</span>
                    </button>
                </div>
            {/each}
        </div>

        <div class="field mt-4">
            <label class="label">Add New Images</label>
            <div class="file has-name is-fullwidth">
            <label class="file-label">
                <input class="file-input" type="file" multiple accept="image/*" onchange={handleFileChange} />
                <span class="file-cta">
                <span class="file-icon"><i class="fas fa-upload"></i></span>
                <span class="file-label"> Choose new files… </span>
                </span>
                <span class="file-name"> {fileName} </span>
            </label>
            </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">Save Changes</button>
        </div>
        <div class="control">
            <button type="button" class="button is-danger" onclick={deleteClub}>Delete Club</button>
        </div>
        <div class="control">
            <a href="/club/{club._id}" class="button is-light">Cancel</a>
        </div>
      </div>
    </form>
  </div>
{/if}