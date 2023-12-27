<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Row from '$lib/components/Row.svelte';
	import { characters, weapons, rooms } from '$lib/data/items';
</script>

<div
	class="w-full h-full flex flex-col flex-1 max-w-xl *:flex-grow border-2 border-blue-600 *:border-t-blue-600 [&>*:not(:first-child)]:border-t-2"
>
	<Heading extraBlocks>Characters</Heading>
	{#each characters as character}
		<Row label={character.name} idx={character.idx} />
	{/each}

	<Heading>Weapons</Heading>
	{#each weapons as weapon}
		<Row label={weapon.name} idx={weapon.idx} />
	{/each}

	<Heading>Rooms</Heading>
	{#each rooms as room}
		<Row label={room.name} idx={room.idx} />
	{/each}
</div>
