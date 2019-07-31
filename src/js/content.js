import browser from '../utils/browser';
import { fetchMarvelImages, getProjectVanityId } from '../utils/marvelAppData';

browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		switch (request.type) {
			case 'getImages':
				const projectId =  getProjectVanityId();
				fetchMarvelImages(projectId)
					.then(images => {
						if (images) {
							sendResponse({ images, projectId });
						} else {
							sendResponse({ projectId, errorMessage: 'No images fetched.' });
						}
					})
					.catch(error => {
						console.log('error', error);
						sendResponse({ projectId, errorMessage: 'No images fetched.' });
					});
				return true; // true indicates that a async response will be sent
				break;
			default:
				sendResponse({ errorMessage: 'you messed up, dude.' });
				console.log('issue with message from extension');
		}
	});
