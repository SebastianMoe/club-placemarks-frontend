<script lang="ts">
  import { goto } from "$app/navigation";
  import { placemarkService } from "$lib/services/placemark-service"; 
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    const success = await placemarkService.login(email, password);
    
    if (success) {
      goto("/clubs"); 
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <form onsubmit={(e) => { e.preventDefault(); login(); }}>
    <UserCredentials bind:email bind:password />
    <button class="button is-primary mt-4">Log In</button>
  </form>
</div>