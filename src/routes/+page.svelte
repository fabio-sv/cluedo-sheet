<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Row from '$lib/components/Row.svelte';
	import { characters, weapons, rooms } from '$lib/data/items';
	import { game } from '../stores/game';

	function getStatesFor(name: string) {
		const states = $game.find((line) => line.name === name)?.states;

		if (!states) {
			throw new Error('issue');
		}

		return states;
	}
</script>

<div
	class="flex flex-col border-4 border-blue-600 m-4 flex-1 *:flex-grow [&>*:not(:first-child)]:border-t-blue-600"
>
	<Heading>Characters</Heading>
	{#each characters as character}
		<Row label={character} states={getStatesFor(character)} />
	{/each}

	<Heading>Weapons</Heading>
	{#each weapons as weapon}
		<Row label={weapon} states={getStatesFor(weapon)} />
	{/each}

	<Heading>Rooms</Heading>
	{#each rooms as room}
		<Row label={room} states={getStatesFor(room)} />
	{/each}
</div>
