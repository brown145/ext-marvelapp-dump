<article>
	<section id="body">
		<AppBody
			images={images}
			previewSize={previewSize}
			errorMessage={errorMessage}
		/>
	</section>
	<section id="footer">
		<AppFooter
			name={name}
			projectId={projectId}
		/>
	</section>
</article>

<script>
	import { onMount } from 'svelte';
	import browser from '../../utils/browser';
	import { activeTabQuery } from '../../utils/messaging';
	import AppBody from './Body.svelte';
	import AppFooter from './Footer.svelte';

	let images = [];
	let projectId = '';
	let errorMessage = '';
	let previewSize = 100;

	browser.storage.sync.get(
		{ previewSize: 100 },
		options => previewSize = options.previewSize
	);

	const handleGetImagesResponse = (response) => {
		images = response.images;
		projectId = response.projectId;
		errorMessage = response.errorMessage;
	}

	onMount(async () => {
		browser.tabs.query(activeTabQuery, function(tabs) {
			browser.tabs.sendMessage(tabs[0].id, {type: 'getImages'}, handleGetImagesResponse);
		});
	});

	export let name;
</script>

<style>
	article {
		width: 800px;
	}

	section {
		padding: 0px 5px;
	}

	#body {
		padding-bottom: 30px;
	}

	#footer {
		background-color: #ddd;
		border-top: 1px solid #333;
		color: #666;
		margin-top: 10px;
		padding-bottom: 10px;
		padding-top: 10px;
		text-align: right;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
