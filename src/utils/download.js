import browser from './browser';

const getFileanme = ({ name }) => {
	var d = new Date();
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}_${d.getHours()}-${d.getMinutes()}__${name}`;
}

const downloadImage = (imageData) =>
	browser.downloads.download({
		url: imageData.url,
		filename: getFileanme(imageData)
	});

export default downloadImage;
