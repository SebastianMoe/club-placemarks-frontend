<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import type { MemberStats } from "$lib/types/placemark-types";

  let { stats = [] }: { stats: MemberStats[] } = $props();
  
  let activeTab = $state("trend"); 

  let sortedStats = $derived([...stats].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
  ));

  let latest = $derived(sortedStats.length > 0 ? sortedStats[sortedStats.length - 1] : null);

  let trendData = $derived({
    labels: sortedStats.map(s => new Date(s.date).toLocaleDateString("de-DE")),
    datasets: [{ name: "Total", values: sortedStats.map(s => s.total) }]
  });

  let demographicsData = $derived(latest ? {
    labels: ["Adults (M)", "Adults (W)", "Youth (M)", "Youth (W)"],
    datasets: [{
      name: "Count",
      values: [latest.adultMale, latest.adultFemale, latest.youthMale, latest.youthFemale]
    }]
  } : null);

  let ageData = $derived(latest ? {
    labels: ["Adults", "Youth"],
    datasets: [{
      values: [
        latest.adultMale + latest.adultFemale, 
        latest.youthMale + latest.youthFemale
      ]
    }]
  } : null);
</script>

{#if stats.length > 0}
  <div class="box">
    <div class="tabs is-boxed is-fullwidth">
      <ul>
        <li class={activeTab === 'trend' ? 'is-active' : ''}>
          <a href="#" onclick={(e) => { e.preventDefault(); activeTab = 'trend'; }}>
            <span class="icon is-small"><i class="fas fa-chart-line"></i></span>
            <span>Trend</span>
          </a>
        </li>
        <li class={activeTab === 'demographics' ? 'is-active' : ''}>
          <a href="#" onclick={(e) => { e.preventDefault(); activeTab = 'demographics'; }}>
            <span class="icon is-small"><i class="fas fa-chart-bar"></i></span>
            <span>Demographics</span>
          </a>
        </li>
        <li class={activeTab === 'age' ? 'is-active' : ''}>
          <a href="#" onclick={(e) => { e.preventDefault(); activeTab = 'age'; }}>
            <span class="icon is-small"><i class="fas fa-chart-pie"></i></span>
            <span>Age structure</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="content">
      {#if activeTab === 'trend'}
        <h3 class="title is-5 has-text-centered">Member Trend</h3>
        <Chart data={trendData} type="line" height={300} colors={['#3e8ed0']} />
      
      {:else if activeTab === 'demographics' && demographicsData}
        <h3 class="title is-5 has-text-centered">Demographics (Current)</h3>
        <Chart data={demographicsData} type="bar" height={300} colors={['#48c774']} />
        
      {:else if activeTab === 'age' && ageData}
        <h3 class="title is-5 has-text-centered">Adults vs. Youth</h3>
        <Chart data={ageData} type="pie" height={300} colors={['#ffdd57', '#ff3860']} />
      {/if}
    </div>
    
    {#if latest}
        <p class="is-size-7 has-text-grey has-text-centered mt-4">
            Data status: {new Date(latest.date).toLocaleDateString("de-DE")}
        </p>
    {/if}
  </div>
{/if}