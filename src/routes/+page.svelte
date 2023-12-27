<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Row from '$lib/components/Row.svelte';
	import { characters, weapons, rooms } from '$lib/data/items';
</script>

<div
	class="flex flex-col border-4 border-blue-600 m-4 flex-1 *:flex-grow [&>*:not(:first-child)]:border-t-blue-600"
>
	<Heading>Characters</Heading>
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
