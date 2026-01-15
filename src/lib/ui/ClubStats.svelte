<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import type { MemberStats } from "$lib/types/placemark-types";

  let { stats = [] }: { stats: MemberStats[] } = $props();

  let chartData = $derived.by(() => {
    const sortedStats = [...stats].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      labels: sortedStats.map(s => new Date(s.date).toLocaleDateString("de-DE")),
      datasets: [
        {
          name: "Total members",
          values: sortedStats.map(s => s.total)
        }
      ]
    };
  });
</script>

{#if stats.length > 0}
  <div class="box">
    <h2 class="title is-4">Membership development</h2>
    <Chart data={chartData} type="line" height={300} colors={['#3e8ed0']} />
  </div>
{:else}
  <div class="notification is-light">
    No statistical data available yet.
  </div>
{/if}