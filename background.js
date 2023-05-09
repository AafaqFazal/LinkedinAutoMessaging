chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'injectScript') {
        console.log("BG working");
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['contentScript.js']
            });
        });
    }
});