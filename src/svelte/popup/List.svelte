<div id="list-controls">
	<label for="update-all">
		<input
			type="checkbox"
			id="update-all"
			on:change={handleSelectionAll}
			checked={selectedImages.length === images.length}
		>
		<strong>All</strong>
	</label>
	<button
		disabled={selectedImages.length <= 0}
		on:click={handleDownloadAllClick}
	>
		download {selectedImages.length} images
	</button>
</div>
<div id="list-content">
	<ul>
		{#each images as image}
			<li class={(selectedImages.includes(image.uuid)) ? 'will-download' : 'will-not-download'}>
				<label for={`select-${image.uuid}`}>
					<input
						type="checkbox"
						id={`select-${image.uuid}`}
						class="imageSelectionCheckbox"
						checked={selectedImages.includes(image.uuid)}
						data-imageid={image.uuid}
						on:change={handleSelection}
					>
					<img width="100px" src="{image.thumbnail}" alt="{image.name}" />
					<div class="imageMeta">
						<span class="name">{image.name}</span>
						<span>{image.url}</span>
					</div>
				</label>
				<button class="svgButton" data-imageid={image.uuid} on:click={handleDownloadOneClick}>
					<DownloadSVG />
				</button>
			</li>
		{/each}
	</ul>
</div>

<script>
	import 'sanitize.css';
	import 'sanitize.css/typography.css';
	import DownloadSVG from './DownloadSVG.svelte';
	import browser from '../../utils/browser';

	export let images;

	let selectedImages = images.map(image => image.uuid);

	const handleSelectionAll = () => {
		if (event.target.checked) {
			selectedImages = images.map(image => image.uuid);
		} else {
			selectedImages = [];
		}
	}

	const handleSelection = event => {
		selectedImages = selectedImages.filter(imageId => imageId !== event.target.dataset.imageid);
		if (event.target.checked) {
			selectedImages.push(event.target.dataset.imageid);
		}
	}

	const handleDownloadAllClick = event =>
		images
			.filter(image => selectedImages.includes(image.uuid))
			.forEach(downloadImage);

	const handleDownloadOneClick = event =>
		downloadImage(images.find(image => image.uuid === event.currentTarget.dataset.imageid));

	const getFileanme = ({ name }) => {
		var d = new Date();
		return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}__${name}`;
	}

	const downloadImage = (imageData) =>
		browser.downloads.download({
			url: imageData.url,
			filename: getFileanme(imageData)
		});
</script>

<style>
	ul {
		padding: 0;
		width: 795px;
		height: 400px;
		overflow-x: hidden;
		overflow-y: scroll;
		margin: 0;
		margin-bottom: 9px;
	}

	button {
		cursor: pointer;
	}
	button:disabled {
		color: #666;
		background: #ccc;
		border: #fff;
	}

	.name {
		font-weight: bold;
	}

	.svgButton {
		border: none;
	}

	#list-controls {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid #aaa;
		padding: 5px;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	#list-controls label {
		padding-left: 5px;
	}


	#list-content {
		padding-top: 37px;
	}

	#list-content ul>li {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 6px 4px;
		border: 1px solid #fff;
		border-right: none;
		border-left: none;
	}

	#list-content ul>li.will-not-download {
		color: #666;
	}

	#list-content ul>li:hover {
		background: #efefef;
		border: 1px solid #999;
		border-right: none;
		border-left: none;
	}

	#list-content ul>li>label {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 2px 0;
	}

	#list-content img {
		margin: 0 6px;
		border: 1px solid #999;
	}

	#list-content .will-not-download img {
		border: 1px solid #ddd;
		opacity: 0.75;
	}

	#list-content .imageMeta {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-direction: column;
	}
</style>
