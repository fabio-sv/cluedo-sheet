<script lang="ts">
	export let extraBlocks = false;
</script>

<div class="bg-blue-100 text-md py-2 pl-2 border-t-2 flex items-center">
	<p class="flex-1"><slot /></p>

	{#if extraBlocks}
		{#each [1, 2, 3, 4, 5, 6] as n}
			<input
				type="text"
				class=" max-w-8 min-w-8 text-center font-black border-y-2 border-l-2 border-blue-600 min-w-8"
			/>
		{/each}
	{/if}
</div>
