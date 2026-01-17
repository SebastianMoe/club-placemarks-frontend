<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club, MemberStats, Event } from "$lib/types/placemark-types";
    import Coordinates from "$lib/ui/Coordinates.svelte";
    import ClubStats from "$lib/ui/ClubStats.svelte";
    import StatsForm from "$lib/ui/StatsForm.svelte";
    import Carousel from "$lib/ui/Carousel.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import EventForm from "$lib/ui/EventForm.svelte";

    let club: Club | null = $state(null);
    let stats: MemberStats[] = $state([]); 
    let events: Event[] = $state([]);
    
    const id = $page.params.id;
    let eventMaps: any[] = $state([]);

    async function refresh() {
        if (id) {
            club = await placemarkService.getClub(id);
            stats = await placemarkService.getMemberStats(id); 
            events = await placemarkService.getEvents(id);
        }
    }

    async function deleteEvent(eventId: string) {
        if (confirm("Really delete this event?")) {
            const success = await placemarkService.deleteEvent(eventId);
            if (success) {
                await refresh();
            }
        }
    }

    onMount(async () => {
        await refresh();
    });
    
    $effect(() => {
        eventMaps.forEach((map, index) => {
            if (map && events[index]) {
                setTimeout(() => {
                    map.addMarker(events[index].latitude, events[index].longitude, `Event: ${events[index].title}`);
                }, 500);
            }
        });
    });
</script>

{#if club}
    <div class="columns">
        <div class="column is-7">
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
                    <Coordinates bind:lat={club.latitude} bind:lng={club.longitude} />
                </div>
            </div>
            
            <ClubStats {stats} />
        </div>

        <div class="column is-5">
            <StatsForm clubId={club._id} onStatsAdded={refresh} />
            
            <div class="mt-5">
                <div class="buttons">
                    <a href="/club/{club._id}/edit" class="button is-fullwidth">
                         <span class="icon"><i class="fas fa-edit"></i></span>
                         <span>Edit Club</span>
                    </a>
                </div>
                <a href="/allclubs" class="button is-fullwidth">Back to list</a>
            </div>

            {#each events as event, i}
                <div class="card mb-5">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-5">{event.title}</p>
                                <p class="subtitle is-6">
                                    <span class="icon"><i class="fas fa-calendar"></i></span> 
                                    {event.date}
                                </p>
                            </div>
                            <div class="media-right">
                                <button class="button is-danger is-small" onclick={() => deleteEvent(event._id!)}>
                                    <span class="icon is-small">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div class="content">
                            {event.description}
                            <br>
                            <small>Attendees: {event.attendees}</small>
                        </div>
                    </div>
                    
                    <div class="card-image pb-4 px-4">
                        <LeafletMap 
                            bind:this={eventMaps[i]}
                            id={`event-map-${event._id}`} 
                            height={25} 
                            location={{ lat: event.latitude, lng: event.longitude }} 
                            zoom={14} 
                        />
                    </div>
                </div>
            {/each}

            <div class="mt-5">
                <div class="box">
                    <h3 class="title is-5">Create New Event</h3>
                    
                    <EventForm clubId={club._id!} onEventCreated={refresh} />
                
                </div>
            </div>

        </div>
    </div>
{/if}