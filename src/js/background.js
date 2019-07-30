import '../img/icon-128.png';
import '../img/icon-34.png';
import browser from '../utils/browser';

// console.log(1, browser.pageAction);
// browser.pageAction.onClicked.addListener(function(tab) {
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });

browser.runtime.onInstalled.addListener(function() {
  browser.declarativeContent.onPageChanged.removeRules(undefined, function() {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'marvelapp.com' },
          })
        ],
        actions: [ new browser.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
