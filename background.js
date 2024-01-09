chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request.action === 'simulatePageUp' ||
    request.action === 'simulatePageDown' ||
    request.action === 'startEyeTracking'
  ) {
    // Find the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        console.log('tabs[0].id');
        console.log(tabs[0].id);
        const tabId = tabs[0].id;

        // Send a message to the content script to simulate Page Up or Page Down
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: (action) => {
            if (action === 'simulatePageUp') {
              console.log('simulatePageUp');
              window.scrollBy(0, -10);
            } else if (action === 'simulatePageDown') {
              console.log('simulatePageDown');
              window.scrollBy(0, 10);
            } else if (action === 'startEyeTracking') {
              console.log('startEyeTracking');
            }
          },
          args: [request.action],
        });
      }
    });
  }
});
