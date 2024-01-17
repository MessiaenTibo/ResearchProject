document.addEventListener('DOMContentLoaded', function () {
  // *** Loaded ***
  console.log('popup.js loaded');

  // *** Variables ***
  const stopBtn = document.getElementById('stopBtn');
  const leftEyeBlinkAction = document.getElementById('leftEyeBlink');
  const rightEyeBlinkAction = document.getElementById('rightEyeBlink');
  const doubleEyeBlinkAction = document.getElementById('doubleEyeBlink');

  // *** Start Eye Tracking ***
  chrome.runtime.sendMessage({ action: 'startEyeTracking' });

  // *** Start Blink Detection ***
  chrome.runtime.sendMessage({ action: 'startBlinkDetection' });

  // *** Get Storage ***
  getSettingsFromChromeStorage();


  // *** Event Listeners ***
  stopBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'stop' });
  });

  leftEyeBlinkAction.addEventListener('change', function () {
    // Log action change
    console.log('leftEyeBlinkAction changed');

    // Get selected action, and remove it from other objects
    const selectedAction = leftEyeBlinkAction.value;

    // Remove selected action from other objects
    const selectedRightEyeBlinkAction = rightEyeBlinkAction.value;
    if (selectedRightEyeBlinkAction === selectedAction) {
      rightEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('rightEyeClickAction', 'none');
    }
    const selectedDoubleEyeBlinkAction = doubleEyeBlinkAction.value;
    if (selectedDoubleEyeBlinkAction === selectedAction) {
      doubleEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('doubleEyeClickAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('leftEyeClickAction', selectedAction);


  });

  rightEyeBlinkAction.addEventListener('change', function () {
    // Log action change
    console.log('rightEyeBlinkAction changed');

    // Get selected action, and remove it from other objects
    const selectedAction = rightEyeBlinkAction.value;

    // Remove selected action from other objects
    const selectedLeftEyeBlinkAction = leftEyeBlinkAction.value;
    if (selectedLeftEyeBlinkAction === selectedAction) {
      leftEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('leftEyeClickAction', 'none');
    }

    const selectedDoubleEyeBlinkAction = doubleEyeBlinkAction.value;
    if (selectedDoubleEyeBlinkAction === selectedAction) {
      doubleEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('doubleEyeClickAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('rightEyeClickAction', selectedAction);

  });

  doubleEyeBlinkAction.addEventListener('change', function () {
    // Log action change
    console.log('doubleEyeBlinkAction changed');

    // Get selected action, and remove it from other objects
    const selectedAction = doubleEyeBlinkAction.value;

    // Remove selected action from other objects
    const selectedLeftEyeBlinkAction = leftEyeBlinkAction.value;
    if (selectedLeftEyeBlinkAction === selectedAction) {
      leftEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('leftEyeClickAction', 'none');
    }

    const selectedRightEyeBlinkAction = rightEyeBlinkAction.value;
    if (selectedRightEyeBlinkAction === selectedAction) {
      rightEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('rightEyeClickAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('doubleEyeClickAction', selectedAction);

  });

  // *** Functions ***
  function storeDataToChromeStorage(key, value) {
    chrome.runtime.sendMessage({ action: 'storeDataToChromeStorage', key: key, value: value }, function (response) {
      console.log(response.message);
    });
  }

  function getSettingsFromChromeStorage() {

    // Get leftEyeClickAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'leftEyeClickAction' }, function (response) {
      console.log(response);
      leftEyeBlinkAction.value = response.message;
    });

    // Get rightEyeClickAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'rightEyeClickAction' }, function (response) {
      console.log(response.message);
      rightEyeBlinkAction.value = response.message;
    });

    // Get doubleEyeClickAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'doubleEyeClickAction' }, function (response) {
      console.log(response.message);
      doubleEyeBlinkAction.value = response.message;
    });
  }
});
