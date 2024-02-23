<script>
    export let addText;
    let text = "";

    const textInserted = () => {
        addText(text);
        text = "";
    }
</script>

<input bind:value={text} /><button on:click={textInserted}>Add text</button>
