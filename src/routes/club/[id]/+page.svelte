<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";

    let club: Club | null = $state(null);

    onMount(async () => {
        const id = $page.params.id!;
        if (id) {
            club = await placemarkService.getClub(id);
        }
    });
</script>

{#if club}
    <div class="box">
        <div class="columns">
            <div class="column is-one-third">
                <figure class="image is-4by3">
                    {#if club.imageUrls && club.imageUrls.length > 0}
                        <img src={club.imageUrls[0]} alt={club.name} style="object-fit: cover; border-radius: 8px;" />
                    {:else}
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                    {/if}
                </figure>
            </div>

            <div class="column">
                <h1 class="title is-2">{club.name}</h1>
                <p class="subtitle is-6 has-text-grey">{club._id}</p>

                <div class="tags">
                    <span class="tag is-primary is-medium">{club.category}</span>
                </div>

                <div class="content">
                    <p>{club.description}</p>
                </div>

                <div class="box">
                    <h3 class="title is-5">Standort</h3>
                    <p>
                        <strong>Breitengrad:</strong> {club.latitude}<br>
                        <strong>Längengrad:</strong> {club.longitude}
                    </p>
                </div>
                
                <div class="buttons">
                    <a href="/allclubs" class="button">Zurück zur Liste</a>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="section">
        <p>Lade Club-Details...</p>
        <progress class="progress is-small is-primary" max="100">15%</progress>
    </div>
{/if}