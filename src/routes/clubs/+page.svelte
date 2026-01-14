<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/runes.svelte";
  import ClubForm from "./ClubForm.svelte";

  subTitle.text = "Register your clubs";
</script>
<Card title="Register Club">
  <ClubForm />
</Card>
