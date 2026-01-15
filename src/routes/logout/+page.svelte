<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service";

  onMount(async () => {
    await placemarkService.logout();
    goto("/");
  });
</script>