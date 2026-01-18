<script lang="ts">
    import type { Event } from "$lib/types/placemark-types";
    import EventForm from "$lib/ui/EventForm.svelte";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { placemarkService } from "$lib/services/placemark-service";

    let { clubId, events, onEventsChanged } = $props<{ 
        clubId: string, 
        events: Event[], 
        onEventsChanged: () => void 
    }>();

    let eventMaps: any[] = $state([]);

    async function deleteEvent(eventId: string) {
        if (confirm("Really delete this event?")) {
            const success = await placemarkService.deleteEvent(eventId);
            if (success) {
                onEventsChanged();
            }
        }
    }

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

<div class="card mt-5">
    <div class="box">
        <h3 class="title is-5">Create New Event</h3>
        <EventForm {clubId} onEventCreated={onEventsChanged} />
    </div>
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
                    <button class="button is-danger is-small" onclick={() => deleteEvent(event._id!)} title="Delete Event">
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