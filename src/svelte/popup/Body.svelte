<button
  disabled={images.length <= 0}
  on:click={handleClick}
>
  download {images.length} images
</button>

<script>
  import browser from '../../utils/browser';

  export let images;

	function handleClick(event) {
    images.forEach(image =>
      browser.downloads.download({
        url: image.url
      })
    );
  }
</script>
