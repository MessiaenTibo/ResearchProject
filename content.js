chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "simulatePageUp") {
        window.scrollBy(0, -window.innerHeight);
    } else if (request.action === "simulatePageDown") {
        window.scrollBy(0, window.innerHeight);
    }
});
