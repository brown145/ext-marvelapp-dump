import browser from '../utils/browser';

export const fetchMarvelImages = projectId =>
	fetch(`https://marvelapp.com/api/project-retrieve/${projectId}/`)
		.then(res => res.json())
		.then(parseData)
		.catch(err => { console.warn('error', err) });

export const getProjectVanityId = () => {
	// EX: https://marvelapp.com/XXXXX/screen/59327507
	// assuming we want the XXXXX
	let path = document.location.pathname;
	path = path.substring(1);
	path = path.substring(0, path.indexOf('/'));

	return path;
};

const parseData = data => Object.values(data.images);

export default {
	fetchMarvelImages,
	getProjectVanityId
};
