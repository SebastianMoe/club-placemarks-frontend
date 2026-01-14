<script lang="ts">
    import { onMount } from "svelte";
    import ClubList from "$lib/ui/ClubList.svelte";
    import { placemarkService } from "$lib/services/placemark-service";
    import type { Club } from "$lib/types/placemark-types";

    let clubs: Club[] = $state([]);

    onMount(async () => {
        clubs = await placemarkService.getClubs();
    });
</script>

<ClubList {clubs} />