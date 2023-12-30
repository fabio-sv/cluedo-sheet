<script lang="ts">
	import QRCode from 'qrcode';
	import { names } from '../../stores/names';
	import Modal from './Modal.svelte';
	import { onMount } from 'svelte';

	// @ts-ignore
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineMenu from 'svelte-icons-pack/ai/AiOutlineMenu';
	import { setTheme, theme } from '../../stores/theme';
	import { themes } from '$lib/data/themes';

	let openMenu: boolean = false;
	let dialog: HTMLDialogElement;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		QRCode.toCanvas(canvas, window.location.href, (error: any) => {
			if (error) console.error();
		});
	});

	const closeMenu = (col: string) => {
		setTheme(col);
		dialog.close();
		openMenu = false;
	};

	$: colours = Object.values(themes).map((t) => t.primary);
</script>

<button on:click={() => (openMenu = true)} class="absolute left-1 top-1 z-20 p-4">
	<Icon src={AiOutlineMenu} className="mx-2" />
</button>

<div class="flex sticky justify-end py-2 top-0 *:shadow-md z-10">
	{#each $names as name}
		<input
			type="text"
			bind:value={name}
			class={`max-w-8 min-w-8 text-center font-black border-y-2 border-l-2 ${$theme.secondary} ${$theme.border} outline-none focus:outline-none rounded-none`}
		/>
	{/each}
</div>

<Modal showModal={openMenu} bind:dialog>
	<p class="font-black text-2xl text-center">Theme</p>

	<div class="mx-auto flex justify-center gap-x-3 py-2">
		{#each colours as colour}
			<button
				class={`rounded-full h-10 w-10 ${colour} border-4 border-gray-200`}
				on:click={() => closeMenu(colour)}
			/>
		{/each}
	</div>

	<canvas bind:this={canvas} class="mx-auto"></canvas>
	<p class="font-black text-2xl text-center">Share with others!</p>
</Modal>
