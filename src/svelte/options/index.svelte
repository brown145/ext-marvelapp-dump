<label>
	<input
		type="number"
		min="50"
		max="500"
		step="25"
		value={previewSize}
		on:change={handleChange}
	/>
	Preview Image Size
</label>

<script>
	import browser from '../../utils/browser';
	let previewSize = '';

	browser.storage.sync.get(
		{ previewSize: 100 },
		options => previewSize = options.previewSize
	);

	const handleChange = event =>
		browser.storage.sync
			.set({previewSize: event.target.value});

</script>
