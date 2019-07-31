<div>
	<h1>{name}</h1>
	{#if (projectId)}
		<span>project id: {projectId}</span>
	{/if}
</div>

<script>
	export let name;
	export let projectId;
</script>

<style>
	h1 {
		margin: 0;
		padding: 0;
		font-size: 100%;
	}
</style>
