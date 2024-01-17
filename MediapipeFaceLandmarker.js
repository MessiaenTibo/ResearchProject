import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';
// import vision from './TaskVision.js';
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;
const videoBlendShapes = document.getElementById('video-blend-shapes');
let faceLandmarker;
let runningMode = 'IMAGE';
// let enableWebcamButton;
let webcamRunning = false;
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
async function createFaceLandmarker() {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm',
  );
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
      delegate: 'CPU',
    },
    outputFaceBlendshapes: true,
    runningMode,
    numFaces: 1,
  });
}
createFaceLandmarker();

const video = document.getElementById('webcam');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');
// Check if webcam access is supported.
function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  //   enableWebcamButton = document.getElementById('webcamButton');
  //   enableWebcamButton.addEventListener('click', enableCam);
  setTimeout(enableCam, 600);
  console.log('Enabling webcam');
  //   enableCam();
} else {
  console.warn('getUserMedia() is not supported by your browser');
}
// Enable the live webcam view and start detection.
function enableCam() {
  console.log('enableCam function called');
  if (!faceLandmarker) {
    console.log('Wait! faceLandmarker not loaded yet.');
    return;
  }
  if (webcamRunning === true) {
    webcamRunning = false;
    // enableWebcamButton.innerText = 'ENABLE PREDICTIONS';
  } else {
    webcamRunning = true;
    // enableWebcamButton.innerText = 'DISABLE PREDICTIONS';
  }
  // getUsermedia parameters.
  const constraints = {
    video: true,
  };
  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}
let lastVideoTime = -1;
let results = undefined;
const drawingUtils = new DrawingUtils(canvasCtx);
async function predictWebcam() {
  video.style.display = 'none';
  // Now let's start detecting the stream.
  if (runningMode === 'IMAGE') {
    runningMode = 'VIDEO';
    await faceLandmarker.setOptions({ runningMode: runningMode });
  }
  let startTimeMs = performance.now();
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime;
    results = faceLandmarker.detectForVideo(video, startTimeMs);
  }
  drawBlendShapes(videoBlendShapes, results.faceBlendshapes);
  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam);
  }
}

let OldValueEyeBlinkLeft = 0;
let OldValueEyeBlinkRight = 0;
let lastDoubleBlinkTime = -1;

const GazePointer = document.getElementById('gaze');

function drawBlendShapes(el, blendShapes) {
  if (!blendShapes.length) {
    return;
  }
  // print the categorie score of the categorie with the categorie name eyeBlinkLeft
  const valueEyeBlinkLeft = blendShapes[0].categories
    .map((shape) =>
      shape.categoryName === 'eyeBlinkLeft' ? shape.score : null,
    )
    .filter((shape) => shape !== null)[0];
  const valueEyeBlinkRight = blendShapes[0].categories
    .map((shape) =>
      shape.categoryName === 'eyeBlinkRight' ? shape.score : null,
    )
    .filter((shape) => shape !== null)[0];

  // Special Event 1: if the user blinks with the left eye only
  if (
    valueEyeBlinkLeft > 0.5 &&
    valueEyeBlinkRight < 0.5 &&
    OldValueEyeBlinkLeft < 0.5 &&
    OldValueEyeBlinkRight < 0.5
  ) {
    console.log('Special Event 1: if the user blinks with the left eye only');
    GazePointer.style.backgroundColor = 'red';
    // Get leftEyeBlinkAction from local storage
    const lefytEyeBlinkAction = localStorage.getItem('leftEyeBlinkAction');
    if (lefytEyeBlinkAction == "none") {
      console.log("No action set for left eye blink");
    } else if (lefytEyeBlinkAction == "click") {
      EmulateClick();
    } else if (lefytEyeBlinkAction == "doubleClick") {
      EmulateDoubleClick();
    } else {
      console.log("Invalid action set for left eye blink");
    }
  }
  // Special Event 2: if the user blinks with the right eye only
  if (
    valueEyeBlinkLeft < 0.5 &&
    valueEyeBlinkRight > 0.5 &&
    OldValueEyeBlinkLeft < 0.5 &&
    OldValueEyeBlinkRight < 0.5
  ) {
    console.log('Special Event 2: if the user blinks with the right eye only');
    GazePointer.style.backgroundColor = 'blue';
    // Get rightEyeBlinkAction from local storage
    const rightEyeBlinkAction = localStorage.getItem('rightEyeBlinkAction');
    if (rightEyeBlinkAction == "none") {
      console.log("No action set for right eye blink");
    } else if (rightEyeBlinkAction == "click") {
      EmulateClick();
    } else if (rightEyeBlinkAction == "doubleClick") {
      EmulateDoubleClick();
    } else {
      console.log("Invalid action set for right eye blink");
    }
  }
  // Special Event 3: if the user blinks with both eyes twice in a row (within 1 second)
  if (
    valueEyeBlinkLeft > 0.5 &&
    valueEyeBlinkRight > 0.5 &&
    OldValueEyeBlinkLeft < 0.5 &&
    OldValueEyeBlinkRight < 0.5
  ) {
    if (lastDoubleBlinkTime === -1) {
      lastDoubleBlinkTime = performance.now();
    } else {
      if (performance.now() - lastDoubleBlinkTime < 1000) {
        console.log(
          'Special Event 3: if the user blinks with both eyes twice in a row (within 1 second)',
        );
        GazePointer.style.backgroundColor = 'orange';
        // Get doubleEyeBlinkAction from local storage
        const doubleEyeBlinkAction = localStorage.getItem(
          'doubleEyeBlinkAction',
        );
        if (doubleEyeBlinkAction == "none") {
          console.log("No action set for double eye blink");
        } else if (doubleEyeBlinkAction == "click") {
          EmulateClick();
        } else if (doubleEyeBlinkAction == "doubleClick") {
          EmulateDoubleClick();
        } else {
          console.log("Invalid action set for double eye blink");
        }
        lastDoubleBlinkTime = -1;
      } else {
        lastDoubleBlinkTime = performance.now();
      }
    }
  }
  OldValueEyeBlinkLeft = valueEyeBlinkLeft;
  OldValueEyeBlinkRight = valueEyeBlinkRight;
}

function EmulateClick() {
  console.log('EmulateClick');
  const element = document.elementFromPoint(
    GazePointer.getBoundingClientRect().x,
    GazePointer.getBoundingClientRect().y,
  );
  if (element) {
    element.click();
  }
}

function EmulateDoubleClick() {
  console.log('EmulateDoubleClick');
  const element = document.elementFromPoint(
    GazePointer.getBoundingClientRect().x,
    GazePointer.getBoundingClientRect().y,
  );
  if (element) {
    element.click();
    element.click();
  }
}
