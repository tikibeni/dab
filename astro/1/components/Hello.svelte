<script>
  let message = "Svelte";

  const updateText = () => {
    if (message === "Svelte") {
        message = "Astro"
    } else {
        message = "Svelte"
    }
  };
</script>

<h1>Hello {message}!</h1>
<button on:click={updateText}>Update!</button>
