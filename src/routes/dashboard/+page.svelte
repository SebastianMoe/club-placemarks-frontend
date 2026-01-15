<script lang="ts">
    import { onMount } from "svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club } from "$lib/types/placemark-types";

    let map: any;

    onMount(async () => {
        const clubs = await placemarkService.getClubs();
        
        setTimeout(() => {
            clubs.forEach((club: Club) => {
                if (club.latitude && club.longitude) {
                    const popup = `<b>${club.name}</b><br><a href="/club/${club._id}">Details</a>`;
                    map.addMarker(club.latitude, club.longitude, popup, club.category);
                }
            });
        }, 200);
    });
</script>

<div class="box">
    <h1 class="title">Dashboard</h1>
    <LeafletMap bind:this={map} height={70} />
</div>