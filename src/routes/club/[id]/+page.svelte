<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club, MemberStats, Event } from "$lib/types/placemark-types";
    import ClubDetails from "$lib/ui/ClubDetails.svelte";
    import StatsManager from "$lib/ui/StatsManager.svelte";
    import EventManager from "$lib/ui/EventManager.svelte";

    let club: Club | null = $state(null);
    let stats: MemberStats[] = $state([]); 
    let events: Event[] = $state([]);
    
    const id = $page.params.id;

    async function refresh() {
        if (id) {
            club = await placemarkService.getClub(id);
            stats = await placemarkService.getMemberStats(id); 
            events = await placemarkService.getEvents(id);
        }
    }

    onMount(async () => {
        await refresh();
    });
</script>

{#if club}
    <div class="columns">
        <div class="column is-7">
            <ClubDetails {club} />
            <StatsManager clubId={club._id!} {stats} onStatsChanged={refresh} />
        </div>

        <div class="column is-5">
            <div class="mb-5">
                <a href="/allclubs" class="button is-fullwidth">Back to list</a>
            </div>
            <EventManager clubId={club._id!} {events} onEventsChanged={refresh} />
        </div>
    </div>
{/if}