# ResearchProject

## Introduction

This project is conducted as part of the Research Project course at Howest-Kortrijk. The primary objective is to explore the potential applications of eye-tracking technology for website interaction.

To achieve this goal, a Chrome extension has been developed, enabling compatibility with any website. The GazeCloudAPI is employed to monitor the user's eye movements, while a MediaPipe face landmark model is utilized to detect blinking movements.

By combining these technologies, the project aims to enhance the user experience by introducing novel methods of interacting with websites through eye-tracking functionality.

## Installation
Download this repository and save it somewhere on your pc.

Go to “chrome://extensions/” in a chrome browser

![chrome extensions](img/image.png)

Click in the “Load unpacked” button <br>
And open the just downloaded code map
 
 ![file manager](img/image-1.png)

## Usage
Open a Chrome browser and click on the extension button
Click on the desired extension

![Chrome extensions tab](img/image-2.png)

The extension opens and is ready to be used.<br>
You can also customize the scrolling speed and blink options

![Alt text](img/image-3.png)


## Inspiration links
1) API for eye tracking: <br>
https://gazerecorder.com/

2) Article on how to use the API and why its better then WebGazer:<br>
https://medium.com/@williamwang15/integrating-gazecloudapi-a-high-accuracy-webcam-based-eye-tracking-solution-into-your-own-web-app-2d8513bb9865

3) Second article on why GazeCloudAPI is better then WebGazer:<br>
https://medium.com/@c.e.moll/a-short-eye-tracking-software-comparison-335721e4a95e

4) Video on the concept of using eye tracking to interact with a webshop:<br>
https://youtu.be/tvgJ9DsgVso

5) Eye blink detection:<br>
https://www.geeksforgeeks.org/eye-blink-detection-with-opencv-python-and-dlib/

6) Eye blink detection MediaPipe Face Landmark Detection Example on what it does:<br>
https://mediapipe-studio.webapps.google.com/studio/demo/face_landmarker

7) Eye blink detection MediaPipe Face Landmark Detection Code Example on how to use it:<br>
https://codepen.io/mediapipe-preview/pen/OJBVQJm