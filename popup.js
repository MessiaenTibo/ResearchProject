document.addEventListener('DOMContentLoaded', function () {
  // *** Loaded ***
  console.log('popup.js loaded');

  // *** Variables ***
  const stopBtn = document.getElementById('stopBtn');
  const leftEyeBlinkAction = document.getElementById('leftEyeBlink');
  const rightEyeBlinkAction = document.getElementById('rightEyeBlink');
  const doubleEyeBlinkAction = document.getElementById('doubleEyeBlink');
  const scrollSpeed = document.getElementById('scrollSpeed');

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
      storeDataToChromeStorage('rightEyeBlinkAction', 'none');
    }
    const selectedDoubleEyeBlinkAction = doubleEyeBlinkAction.value;
    if (selectedDoubleEyeBlinkAction === selectedAction) {
      doubleEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('doubleEyeBlinkAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('leftEyeBlinkAction', selectedAction);


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
      storeDataToChromeStorage('leftEyeBlinkAction', 'none');
    }

    const selectedDoubleEyeBlinkAction = doubleEyeBlinkAction.value;
    if (selectedDoubleEyeBlinkAction === selectedAction) {
      doubleEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('doubleEyeBlinkAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('rightEyeBlinkAction', selectedAction);

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
      storeDataToChromeStorage('leftEyeBlinkAction', 'none');
    }

    const selectedRightEyeBlinkAction = rightEyeBlinkAction.value;
    if (selectedRightEyeBlinkAction === selectedAction) {
      rightEyeBlinkAction.value = 'none';
      // Change storage
      storeDataToChromeStorage('rightEyeBlinkAction', 'none');
    }

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('doubleEyeBlinkAction', selectedAction);

  });

  scrollSpeed.addEventListener('change', function () {
    // Log action change
    console.log('scrollSpeed changed');

    // Save it using the Chrome extension storage API.
    storeDataToChromeStorage('scrollSpeed', scrollSpeed.value);
  });

  // *** Functions ***
  function storeDataToChromeStorage(key, value) {
    chrome.runtime.sendMessage({ action: 'storeDataToChromeStorage', key: key, value: value }, function (response) {
      console.log(response.message);
    });
  }

  function getSettingsFromChromeStorage() {

    // Get leftEyeBlinkAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'leftEyeBlinkAction' }, function (response) {
      console.log(response);
      leftEyeBlinkAction.value = response.message;
    });

    // Get rightEyeBlinkAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'rightEyeBlinkAction' }, function (response) {
      console.log(response.message);
      rightEyeBlinkAction.value = response.message;
    });

    // Get doubleEyeBlinkAction from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'doubleEyeBlinkAction' }, function (response) {
      console.log(response.message);
      doubleEyeBlinkAction.value = response.message;
    });

    // Get scrollSpeed from storage
    chrome.runtime.sendMessage({ action: 'getDataFromChromeStorage', key: 'scrollSpeed' }, function (response) {
      console.log(response.message);
      scrollSpeed.value = response.message;
    });
  }
});
