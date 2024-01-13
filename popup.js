document.addEventListener('DOMContentLoaded', function () {
  console.log('popup.js loaded');

  // *** Start Eye Tracking ***
  chrome.runtime.sendMessage({ action: 'startEyeTracking' });

  // *** Start Blink Detection ***
  chrome.runtime.sendMessage({ action: 'startBlinkDetection' });

  const stopBtn = document.getElementById('stopBtn');
  stopBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'stop' });
  });
});
