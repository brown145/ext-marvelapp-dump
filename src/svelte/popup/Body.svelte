{#if images === undefined}
		<div id="errorContainer">
			Error: {errorMessage}
		</div>
{:else if images.length === 0}
	<div id="loadingContainer">
		<Loading />
	</div>
{:else}
	<div id="listContainer">
		<List images={images} previewSize={previewSize} />
	</div>
{/if}

<script>
	import Loading from './Loading.svelte';
	import List from './List.svelte';

	export let images;
	export let previewSize;
	export let errorMessage;
</script>

<style>
	#loadingContainer,
	#errorContainer {
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
