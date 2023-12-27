<script lang="ts">
	import type { State } from '../../stores/game';
	import { States, game } from '../../stores/game';

	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImCross from 'svelte-icons-pack/im/ImCross';
	import ImCheckmark from 'svelte-icons-pack/im/ImCheckmark';

	export let label: string;
	export let states: State[];

	let open: number = -1;

	function onOpen(idx: number) {
		open = idx;
	}

	function onSelect(character?: States, note?: number) {
		console.log('updating game', label, open, character, note);

		$game = $game.map((line) => {
			if (line.name !== label) {
				return line;
			}

			const newAtom = { ...line.states[open] };
			console.log(JSON.stringify(line.states), open, newAtom);

			// debugger;

			if (character) {
				newAtom.state = character;
			}

			if (note) {
				const notes = Array.from(new Set([...newAtom.notes, note]));
				newAtom.notes = [...notes.sort()];
			}

			console.log(JSON.stringify(line.states), open, newAtom);

			line.states[open] = { ...newAtom };

			console.log(JSON.stringify(line.states), open, newAtom);

			return line;
		});

		open = -1;
	}

	$: console.log($game);
</script>

<div class="flex border-t-2">
	<p class="flex-1 py-[0.125rem] px-4">{label}</p>

	{#each states as state, i (i)}
		<button
			class="flex relative justify-center items-center border-l-2 border-blue-600 min-w-8"
			class:highlight={open === i}
			on:click={() => onOpen(i)}
		>
			{#if state.state === States.CROSS}
				<Icon src={ImCross} />
			{:else if state.state === States.TICK}
				<Icon src={ImCheckmark} />
			{:else if state.state === States.MAYBE}
				?
			{/if}

			<div class="absolute text-[0.5rem] right-[0.2rem] bottom-0 text-right">
				{#each state.notes as note, note_i (note_i)}
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
