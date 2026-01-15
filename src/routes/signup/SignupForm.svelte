<script lang="ts">
  import { goto } from "$app/navigation";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";
  import { placemarkService } from "$lib/services/placemark-service";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
    const success = await placemarkService.signup(firstName, lastName, email, password);
    
    if (success) {
      goto("/login"); 
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <form onsubmit={(e) => { e.preventDefault(); signup(); }}>
    <UserDetails bind:firstName bind:lastName />
    <UserCredentials bind:email bind:password />
    <button class="button is-success mt-4">Sign Up</button>
  </form>
  <p class="has-text-centered mt-2">
    Already have an account? <a href="/login">Login Here</a>
  </p>
</div>