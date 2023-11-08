document.addEventListener('DOMContentLoaded', function() {
    const pageUpBtn = document.getElementById('pageUpBtn');
    const pageDownBtn = document.getElementById('pageDownBtn');
  
    // Send a message to the background script to simulate Page Up
    pageUpBtn.addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: "simulatePageUp" });
    });
  
    // Send a message to the background script to simulate Page Down
    pageDownBtn.addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: "simulatePageDown" });
    });
  });
  