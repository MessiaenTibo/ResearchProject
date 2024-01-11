// Site
const site = window.location.hostname;

// Add Custom CSS - Function
const Add_Custom_CSS = (css) =>
  (document.head.appendChild(document.createElement('style')).innerHTML = css);

// Create Custom Element - Function
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.body.append(custom_element);
}

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
