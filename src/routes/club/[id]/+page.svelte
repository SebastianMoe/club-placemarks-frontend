<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club, MemberStats } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import ClubStats from "$lib/ui/ClubStats.svelte";
    import StatsForm from "$lib/ui/StatsForm.svelte";

    let club: Club | null = $state(null);
    let stats: MemberStats[] = $state([]); 

    const id = $page.params.id;

    async function refresh() {
        if (id) {
            club = await placemarkService.getClub(id);
            stats = await placemarkService.getMemberStats(id); 
        }
    }

    onMount(async () => {
        await refresh();
    });
</script>

{#if club}
    <div class="columns">
        <div class="column is-7">
            <div class="box">
                <h1 class="title is-2">{club.name}</h1>
                
                <div class="box">
                    <h3 class="title is-5">Location</h3>
                    <Coordinates bind:lat={club.latitude} bind:lng={club.longitude} />
                </div>
            </div>
            
            <ClubStats {stats} />
        </div>

        <div class="column is-5">
            <StatsForm clubId={club._id} onStatsAdded={refresh} />
            
            <div class="mt-5">
                 <a href="/allclubs" class="button is-fullwidth">Back to list</a>
            </div>
        </div>
    </div>
{/if}