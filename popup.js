document.addEventListener('DOMContentLoaded', function () {
  console.log('popup.js loaded');

  // *** Start Eye Tracking ***
  chrome.runtime.sendMessage({ action: 'startEyeTracking' });

  // *** Start Blink Detection ***
  chrome.runtime.sendMessage({ action: 'startBlinkDetection' });

  const stopBtn = document.getElementById('stopBtn');
  stopBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'stopEyeTracking' });
    chrome.runtime.sendMessage({ action: 'stopBlinkDetection' });
  });

  // *** Start Eye Tracking ***
  // const startBtn = document.getElementById('startBtn');
  // startBtn.addEventListener('click', function () {
  //   chrome.runtime.sendMessage({ action: 'startEyeTracking' });
  // });

  // *** Scrolling ***
  // const pageUpBtn = document.getElementById('pageUpBtn');
  // const pageDownBtn = document.getElementById('pageDownBtn');

  // Send a message to the background script to simulate Page Up
  // pageUpBtn.addEventListener('click', function () {
  //   console.log('pageUpBtn clicked');
  //   chrome.runtime.sendMessage({ action: 'simulatePageUp' });
  // });

  // Send a message to the background script to simulate Page Down
  // pageDownBtn.addEventListener('click', function () {
  //   console.log('pageDownBtn clicked');
  //   chrome.runtime.sendMessage({ action: 'simulatePageDown' });
  // });

  // *** Eye tracking ***
  // const startEyeTrackingBtn = document.getElementById('startEyeTrackingBtn');
  // startEyeTrackingBtn.addEventListener('click', function () {
  //   // console.log('startEyeTrackingBtn clicked');
  //   // chrome.runtime.sendMessage({ action: 'startEyeTracking' });
  //   GazeCloudAPI.StartEyeTracking();
  // });

  // let GazeCalibrationComplete = false;

  // var x = GazeData.docX;
  // var y = GazeData.docY;
  // var gaze = document.getElementById('gaze');
  // x -= gaze.clientWidth / 2;
  // y -= gaze.clientHeight / 2;
  // const screenWidth = window.innerWidth;
  // const screenHeight = window.innerHeight;

  // function PlotGaze(GazeData) {
  //   // if (!GazeCalibrationComplete) return;
  //   console.log(GazeData);
  //   document.getElementById('GazeData').innerHTML =
  //     'GazeX: ' + GazeData.GazeX + ' GazeY: ' + GazeData.GazeY;
  //   document.getElementById('HeadPoseData').innerHTML =
  //     ' HeadX: ' +
  //     GazeData.HeadX +
  //     ' HeadY: ' +
  //     GazeData.HeadY +
  //     ' HeadZ: ' +
  //     GazeData.HeadZ;
  //   document.getElementById('HeadRotData').innerHTML =
  //     ' Yaw: ' +
  //     GazeData.HeadYaw +
  //     ' Pitch: ' +
  //     GazeData.HeadPitch +
  //     ' Roll: ' +
  //     GazeData.HeadRoll;
  //   var x = GazeData.docX;
  //   var y = GazeData.docY;
  //   var gaze = document.getElementById('gaze');
  //   x -= gaze.clientWidth / 2;
  //   y -= gaze.clientHeight / 2;
  //   gaze.style.left = x + 'px';
  //   gaze.style.top = y + 'px';
  //   if (GazeData.state != 0) {
  //     if (gaze.style.display == 'block') gaze.style.display = 'none';
  //   } else {
  //     if (gaze.style.display == 'none') gaze.style.display = 'block';
  //   }

  //   // If looking at top of the page, scroll up
  //   if (GazeData.GazeY < 100) {
  //     chrome.runtime.sendMessage({ action: 'simulatePageUp' });
  //   }
  //   // If looking at bottom of the page, scroll down
  //   if (GazeData.GazeY > screenHeight - 100) {
  //     chrome.runtime.sendMessage({ action: 'simulatePageDown' });
  //   }
  // }

  // GazeCloudAPI.OnResult = PlotGaze;

  // GazeCloudAPI.OnCalibrationComplete = function () {
  //   console.log('gaze Calibration Complete');
  //   GazeCalibrationComplete = true;
  // };
});
