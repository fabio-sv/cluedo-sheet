<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import Header from '$lib/components/Header.svelte';
	import Row from '$lib/components/Row.svelte';
	import { characters, weapons, rooms } from '$lib/data/items';
	import { theme } from '../stores/theme';
</script>

<div
	class={`mx-2 min-h-screen flex flex-col flex-1 max-w-xl *:flex-grow border-2 ${$theme.border} ${$theme.childBorder} [&>*:not(:first-child)]:border-t-2`}
>
	<Header />

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
