<script lang="ts">
	import type { State } from '../../stores/game';
	import { States, game } from '../../stores/game';

	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import ImCross from 'svelte-icons-pack/im/ImCross';
	import ImCheckmark from 'svelte-icons-pack/im/ImCheckmark';
	import { fade, slide } from 'svelte/transition';
	import Modal from './Modal.svelte';
	import { theme } from '../../stores/theme';

	export let label: string;
	export let idx: number;

	let dialog: HTMLDialogElement;

	let nameState: 'none' | 'through' | 'circled' = 'none';

	let open: number = -1;

	function next() {
		switch (nameState) {
			case 'none':
				return 'through';
			case 'through':
				return 'circled';
			case 'circled':
				return 'none';
		}
	}

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
		const newNotes = note ? getNewNotes($game[idx][open].notes, note) : $game[idx][open].notes;

		const newState: State = {
			state:
				$game[idx][open].state === character ? States.UNKNOWN : character || $game[idx][open].state,
			notes: newNotes
		};

		$game[idx][open] = newState;
		open = -1;
		dialog.close();
	}
</script>

<div class="flex border-t-2">
	<button
		class="flex-1 py-[0.125rem] px-2 font-semibold text-left"
		class:line-through={nameState === 'through'}
		class:circled={nameState === 'circled'}
		on:click={() => (nameState = next())}
	>
		{label}
	</button>

	{#each $game[idx] as state, j (j)}
		<button
			class={`flex relative justify-center items-center border-l-2 ${$theme.border} min-w-8`}
			class:highlight={open === j}
			on:click={() => onOpen(j)}
		>
			{#if state.state === States.CROSS}
				<div transition:fade><Icon src={ImCross} /></div>
			{:else if state.state === States.TICK}
				<div transition:fade><Icon src={ImCheckmark} /></div>
			{:else if state.state === States.MAYBE}
				<div transition:fade class="font-black">?</div>
			{/if}

			<div class="absolute text-[0.5rem] right-[0.2rem] bottom-0 text-right">
				{#each state.notes as note}
					<span transition:slide>{note + ' '}</span>
				{/each}
			</div>
		</button>
	{/each}
</div>

<Modal showModal={open !== -1} bind:dialog className={$theme.secondary}>
	<div class="grid grid-cols-3 *:p-2 *:m-2 *:border-2 *:border-black *:rounded-md">
		<button
			class="font-black text-5xl flex justify-center items-center"
			on:click={() => onSelect(States.CROSS)}
		>
			<Icon className="flex justify-center items-center" src={ImCross} />
		</button>
		<button
			class="font-black text-5xl flex justify-center items-center"
			on:click={() => onSelect(States.TICK)}
		>
			<Icon className="flex justify-center items-center" src={ImCheckmark} />
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
</Modal>

<style lang="postcss">
	.highlight {
		@apply bg-red-400/50;
	}

	.circled {
		@apply font-black text-red-600;
	}
</style>
