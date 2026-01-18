<script lang="ts">
    import Carousel from "$lib/ui/Carousel.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import type { Club } from "$lib/types/placemark-types";

    let { club } = $props<{ club: Club }>();
    let clubMap: any = $state();

    $effect(() => {
        if (clubMap && club) {
            setTimeout(() => {
                if(club != null)
                    clubMap.addMarker(club.latitude, club.longitude, `<b>${club.name}</b>`, club.category);
            }, 500);
        }
    });
</script>

<div class="box">
    <h1 class="title is-2">{club.name}</h1>

    <div class="box">
        <Carousel imageUrls={club.imageUrls ?? []} />
    </div>

    <div class="box">
        <h3 class="title is-5">Description</h3>
        <p>{club.description}</p>
    </div>

    <div class="box">
        <h3 class="title is-5">Location</h3>
        <LeafletMap 
            bind:this={clubMap} 
            id="club-map" 
            height={40} 
            location={{ lat: club.latitude, lng: club.longitude }} 
            zoom={12} 
        />
    </div>

    <div class="buttons">
        <a href="/club/{club._id}/edit" class="button is-warning is-fullwidth">
             <span class="icon"><i class="fas fa-edit"></i></span>
             <span>Edit Club</span>
        </a>
    </div>
</div>