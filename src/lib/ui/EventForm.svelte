<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import type { Event } from "$lib/types/placemark-types";

  let { clubId, onEventCreated } = $props<{ clubId: string, onEventCreated: () => void }>();

  let title = $state("");
  let description = $state("");
  let date = $state("");
  let attendees = $state(0);
  let latitude = $state(0.0);
  let longitude = $state(0.0);

  async function createEvent() {
    const newEvent: Event = {
        title,
        description,
        date,
        attendees,
        latitude,
        longitude,
        clubId
    };

    const success = await placemarkService.createEvent(newEvent);
    if (success) {
        title = "";
        description = "";
        date = "";
        attendees = 0;
        onEventCreated();
    } else {
        alert("Error creating event");
    }
  }
</script>

<form onsubmit={(e) => { e.preventDefault(); createEvent(); }}>
  <div class="field">
    <label class="label" for="event-title">Event Title</label>
    <input id="event-title" bind:value={title} class="input" type="text" placeholder="e.g. Summer Festival" required />
  </div>

  <div class="field">
    <label class="label" for="event-description">Description</label>
    <textarea id="event-description" bind:value={description} class="textarea" placeholder="What's happening?"></textarea>
  </div>

  <div class="columns">
    <div class="column">
        <div class="field">
            <label class="label" for="event-date">Date</label>
            <input id="event-date" bind:value={date} class="input" type="date" required />
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="event-attendees">Expected Attendees</label>
            <input id="event-attendees" bind:value={attendees} class="input" type="number" min="0" />
        </div>
    </div>
  </div>

  <div class="box">
    <h4 class="subtitle is-6">Event Location</h4>
    <p class="help mb-2">Where will this specific event take place?</p>
    <Coordinates bind:lat={latitude} bind:lng={longitude} />
  </div>

  <button class="button is-primary is-fullwidth">Add Event</button>
</form>