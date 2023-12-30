<script lang='ts'>
	import { theme } from "../../stores/theme";
</script>

<div class={`${$theme.secondary} text-md py-2 pl-2 flex items-center`}>
	<p class="flex-1 text-xl font-bold"><slot /></p>
</div>
