chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request.action === 'simulatePageUp' ||
    request.action === 'simulatePageDown' ||
    request.action === 'startEyeTracking' ||
    request.action === 'startBlinkDetection'
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
            // Add Custom CSS - Function
            const Add_Custom_CSS = (css) =>
              (document.head.appendChild(
                document.createElement('style'),
              ).innerHTML = css);

            // Create Custom Element - Function
            function Create_Custom_Element(tag, attr_tag, attr_name, value) {
              const custom_element = document.createElement(tag);
              custom_element.setAttribute(attr_tag, attr_name);
              custom_element.innerHTML = value;
              document.body.append(custom_element);
            }

            // *** Action ***
            if (action === 'simulatePageUp') {
              console.log('simulatePageUp');
              window.scrollBy(0, -10);
            } else if (action === 'simulatePageDown') {
              console.log('simulatePageDown');
              window.scrollBy(0, 10);
            } else if (action === 'startEyeTracking') {
              // Create script element
              const localScriptURL = chrome.runtime.getURL('GazeCloudApi.js');
              const scriptElement = document.createElement('script');
              scriptElement.src = localScriptURL;

              // Set up onload event to ensure the script is fully loaded
              scriptElement.onload = function () {
                console.log('GazeCloudApi.js loaded');
                // Add Custom CSS
                Add_Custom_CSS(`
                #gaze {
                position: absolute;
                width: 2.5rem;
                height: 2.5rem;
                background-color: green;
                border-radius: 50%;
                opacity: 0.5;
                z-index: 9999;
                }`);

                // Create Custom Element
                Create_Custom_Element('div', 'id', 'gaze', '');
                // Create_Custom_Element('div', 'id', 'GazeData', '');
                // Create_Custom_Element('div', 'id', 'HeadPoseData', '');
                // Create_Custom_Element('div', 'id', 'HeadRotData', '');
              };

              // Append the script element to the head
              document.head.appendChild(scriptElement);
            } else if (action === 'startBlinkDetection') {
              // Create script element
              const localScriptURL = chrome.runtime.getURL(
                'MediapipeFaceLandmarker.js',
              );
              const scriptElement2 = document.createElement('script');
              scriptElement2.type = 'module';
              scriptElement2.src = localScriptURL;

              // Create Custom Element
              const element = document.createElement('div');
              element.innerHTML = `<div style="position: relative;">
              <video id="webcam" style="position: absolute" autoplay playsinline></video>
              <canvas class="output_canvas" id="output_canvas"
                  style="position: absolute; left: 0px; top: 0px;"></canvas>
          </div>`;
              document.body.append(element);

              // Set up onload event to ensure the script is fully loaded
              scriptElement2.onload = function () {
                console.log('MediapipeFaceLandmarker.js loaded');
              };

              // Append the script element to the head
              document.head.appendChild(scriptElement2);
            }
          },
          args: [request.action],
        });
      }
    });
  }
});
