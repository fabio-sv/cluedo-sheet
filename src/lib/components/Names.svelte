<script lang='ts'>

	import { names } from "../../stores/names";

</script>
<div class='flex justify-end py-2 sticky top-0 *:shadow-md z-10 *:bg-green-100'>
    {#each $names as name}
        <input
            type="text"
            bind:value={name}
            class="max-w-8 min-w-8 text-center font-black border-y-2 border-l-2 border-green-600 bg-white outline-none focus:outline-none rounded-none"
        />
    {/each}
</div>
