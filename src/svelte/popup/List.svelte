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
		download {selectedImages.length} of {images.length} images
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
					<img width="{`${previewSize}px`}" src="{image.thumbnail}" alt="{image.name}" />
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
	import DownloadSVG from './DownloadSVG.svelte';
	import downloadImage from '../../utils/download';

	export let images;
	export let previewSize;

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

	.name {
		font-weight: bold;
	}

	.svgButton {
		border: none;
		background: none;
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
		margin-right: 5px;
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
