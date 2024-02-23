<script>
  let numbers = [];
  let num = ""
  let sum = 0

  const addNum = () => {
    if (num !== "") {
      numbers = [...numbers, num]
      sum = sum + num
      num = ""
    }
  }
</script>

<h1>Statistics generator</h1>

<input bind:value={num} type="number" />
<button on:click={addNum}>Add value</button>

<h2>Statistics</h2>

<p>Sum: {sum}</p>
<p>Total numbers: {numbers.length}</p>
<p>Average: {sum / numbers.length}</p>

<h2>Numbers entered so far</h2>

<ul>
  {#each numbers as n}
    <li>{n}</li>
  {/each}
</ul>
