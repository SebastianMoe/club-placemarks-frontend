<script lang="ts">
  import { placemarkService } from "$lib/services/placemark-service";
  import type { MemberStats } from "$lib/types/placemark-types";

  let { clubId, onStatsAdded } = $props();

  let adultMale = $state(0);
  let adultFemale = $state(0);
  let youthMale = $state(0);
  let youthFemale = $state(0);
  
  let statsDate = $state(new Date().toISOString().split('T')[0]);

  let total = $derived(Number(adultMale) + Number(adultFemale) + Number(youthMale) + Number(youthFemale));

  async function addStats() {
    const statsData = {
      adultMale: Number(adultMale),
      adultFemale: Number(adultFemale),
      youthMale: Number(youthMale),
      youthFemale: Number(youthFemale),
      total: total,
      date: new Date(statsDate).toISOString()
    };

    const success = await placemarkService.addMemberStats(clubId, statsData as unknown as MemberStats);
    
    if (success) {
      onStatsAdded();
    } else {
        console.log("Error adding stats");
    }
  }
</script>

<div class="box">
  <h3 class="title is-5">Add Statistics</h3>
  <form onsubmit={(e) => { e.preventDefault(); addStats(); }}>
    
    <div class="field">
        <label class="label" for="date">Date</label>
        <div class="control">
            <input id="date" class="input" type="date" bind:value={statsDate} required />
        </div>
    </div>

    <div class="columns">
      <div class="column">
        <label class="label" for="am">Adults (M)</label>
        <input id="am" class="input" type="number" bind:value={adultMale} min="0" />
      </div>
      <div class="column">
        <label class="label" for="af">Adults (F)</label>
        <input id="af" class="input" type="number" bind:value={adultFemale} min="0" />
      </div>
    </div>
    <div class="columns">
        <div class="column">
          <label class="label" for="ym">Youth (M)</label>
          <input id="ym" class="input" type="number" bind:value={youthMale} min="0" />
        </div>
        <div class="column">
          <label class="label" for="yf">Youth (F)</label>
          <input id="yf" class="input" type="number" bind:value={youthFemale} min="0" />
        </div>
      </div>
    
    <div class="notification is-primary is-light has-text-centered">
        <strong>Total: {total}</strong>
    </div>

    <button class="button is-primary is-fullwidth">Save</button>
  </form>
</div>