<script lang="ts">
    import { onMount } from "svelte";
    import ClubList from "$lib/ui/ClubList.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club } from "$lib/types/placemark-types";

    let clubs: Club[] = $state([]);

    onMount(async () => {
        clubs = await placemarkService.getClubs();
    });

    async function deleteClub(id: string) {
        const success = await placemarkService.deleteClub(id);
        if (success) {
            clubs = clubs.filter(club => club._id !== id);
        }
    }
</script>

<ClubList {clubs} {deleteClub} />