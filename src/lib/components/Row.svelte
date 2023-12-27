<script lang="ts">
	import type { State } from '../../stores/game';
	import { States, newGame } from '../../stores/game';

	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImCross from 'svelte-icons-pack/im/ImCross';
	import ImCheckmark from 'svelte-icons-pack/im/ImCheckmark';

	export let label: string;
	export let idx: number;

	let open: number = -1;

	function onOpen(idx: number) {
		open = idx;
	}

	function getNewNotes(existing: number[], newNote: number) {
		if (existing.includes(newNote)) {
			return existing.filter((note) => note !== newNote);
		}

		return Array.from(new Set([...existing, newNote])).sort();
	}

	function onSelect(character?: States, note?: number) {
		const newNotes = note
			? getNewNotes($newGame[idx][open].notes, note)
			: $newGame[idx][open].notes;

		const newState: State = {
			state: character || $newGame[idx][open].state,
			notes: newNotes
		};

		$newGame[idx][open] = newState;
		open = -1;
	}
</script>

<div class="flex border-t-2">
	<p class="flex-1 py-[0.125rem] px-2 font-semibold">{label}</p>

	{#each $newGame[idx] as state, j (j)}
		<button
			class="flex relative justify-center items-center border-l-2 border-blue-600 min-w-8"
			class:highlight={open === j}
			on:click={() => onOpen(j)}
		>
			{#if state.state === States.CROSS}
				<Icon src={ImCross} />
			{:else if state.state === States.TICK}
				<Icon src={ImCheckmark} />
			{:else if state.state === States.MAYBE}
				?
			{/if}

			<div class="absolute text-[0.5rem] right-[0.2rem] bottom-0 text-right">
				{#each state.notes as note}
					{note + ' '}
				{/each}
			</div>
		</button>
	{/each}
</div>

{#if open !== -1}
	<div
		class="absolute top-0 left-0 z-10 bg-white/80 min-h-screen w-full grid grid-cols-3 place-items-center *:border-2 *:border-blue-400 *:h-full *:w-full"
	>
		<button
			class="font-black text-5xl flex justify-center items-center"
			on:click={() => onSelect(States.CROSS)}
		>
			<Icon class="flex justify-center items-center" src={ImCross} />
		</button>
		<button
			class="font-black text-5xl flex justify-center items-center"
			on:click={() => onSelect(States.TICK)}
		>
			<Icon class="flex justify-center items-center" src={ImCheckmark} />
		</button>

		<button
			class="font-black text-5xl flex justify-center items-center"
			on:click={() => onSelect(States.MAYBE)}>?</button
		>

		{#each [1, 2, 3, 4, 5, 6] as note}
			<button
				class="font-black text-5xl flex justify-center items-center"
				on:click={() => onSelect(undefined, note)}>{note}</button
			>
		{/each}
	</div>
{/if}

<style lang="postcss">
	.highlight {
		@apply bg-red-400/50;
	}
</style>
