<script lang="ts">
    import type { MemberStats } from "$lib/types/placemark-types";
    import ClubStats from "$lib/ui/ClubStats.svelte";
    import StatsForm from "$lib/ui/StatsForm.svelte";
    import { placemarkService } from "$lib/services/placemark-service";

    let { clubId, stats, onStatsChanged } = $props<{ 
        clubId: string, 
        stats: MemberStats[], 
        onStatsChanged: () => void 
    }>();

    async function deleteStat(statId: string) {
        if (clubId && confirm("Delete this statistic entry?")) {
            const success = await placemarkService.deleteMemberStats(clubId, statId);
            if (success) {
                onStatsChanged();
            }
        }
    }
</script>

<StatsForm {clubId} onStatsAdded={onStatsChanged} />

<ClubStats {stats} />

{#if stats.length > 0}
    <div class="box">
        <h3 class="title is-5">Statistics History</h3>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Total Members</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each stats as stat}
                    <tr>
                        <td>{new Date(stat.date).toLocaleDateString()}</td>
                        <td>{stat.total}</td>
                        <td class="has-text-right">
                            <button class="button is-danger is-small" onclick={() => deleteStat(stat._id!)} title="Delete Statistic">
                                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}