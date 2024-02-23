<script>
  import { items } from './itemStore.js';
  let text = "";

  const addItem = () => {
    $items = [...$items, text]
    text = ""
  }
</script>

<h2>Add an item</h2>

<input bind:value={text} type="text"/><button on:click={addItem}>Add!</button>