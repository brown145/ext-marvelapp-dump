import browser from '../utils/browser';
import fetchMarvelImages from '../utils/fetchMarvelImages';

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
      case 'getImages':
        fetchMarvelImages()
          .then(res => {
            sendResponse(res);
          });
        return true; // true indicates that a async response will be sent
        break;
      default:
        sendResponse({ error: 'you messed up, dude.' });
        console.log('issue with message from extension');
    }
  });
