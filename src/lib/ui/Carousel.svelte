<script lang="ts">
  let { imageUrls = [] }: { imageUrls: string[] } = $props();

  let currentIndex = $state(0);

  function next() {
    // Modulo-Operator sorgt dafür, dass es nach dem letzten Bild wieder bei 0 anfängt
    currentIndex = (currentIndex + 1) % imageUrls.length;
  }

  function prev() {
    // Wenn wir bei 0 sind und zurück gehen, springen wir zum letzten Bild
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
  }
</script>

{#if imageUrls.length > 0}
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src={imageUrls[currentIndex]} alt="Club Image {currentIndex + 1}" style="object-fit: cover;" />
      </figure>
    </div>
    
    {#if imageUrls.length > 1}
      <footer class="card-footer">
        <button class="card-footer-item button is-white" onclick={prev}>
          <span class="icon"><i class="fas fa-chevron-left"></i></span>
          <span>Prev</span>
        </button>
        <div class="card-footer-item">
            {currentIndex + 1} / {imageUrls.length}
        </div>
        <button class="card-footer-item button is-white" onclick={next}>
          <span>Next</span>
          <span class="icon"><i class="fas fa-chevron-right"></i></span>
        </button>
      </footer>
    {/if}
  </div>
{:else}
  <div class="box has-text-centered">
    <span class="icon is-large has-text-grey-light">
      <i class="fas fa-image fa-3x"></i>
    </span>
    <p>No images available</p>
  </div>
{/if}