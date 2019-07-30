{#if images.length}
	<div id="listContainer">
		<List images={images} />
	</div>
{:else}
	<div id="loadingContainer">
		<Loading />
	</div>
{/if}

<script>
	import Loading from './Loading.svelte';
	import List from './List.svelte';

	export let images;
</script>

<style>
	#loadingContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 170px;
	}
	#listContainer {
		display: flex;
		justify-content: start;
	}
</style>
