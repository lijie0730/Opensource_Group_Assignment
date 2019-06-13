//Weather
function saveOptions(e) {
  e.preventDefault();
  //this is an object, values are ,-seperated
  browser.storage.local.set({
    color: document.querySelector("#color").value,
    theme: document.querySelector("#theme").value,
    image: document.querySelector("#image").value,
    weather: document.querySelector("#weather").checked
  });
  console.log(document.querySelector('#weather').checked);
}

function displayImageSettings() {
  // Hide image-specific settings unless needed
  var div0 = document.getElementById("local-select");
  if (document.querySelector("#theme").value == "Image") {
    div0.style.display = "block";
  } else if (document.querySelector("#theme").value != "Image") {
    div0.style.display = "none";
  }
}

// Show image-specific settings when "image" selected
document.getElementById("theme").addEventListener("change", displayImageSettings);

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#color").value = result.color || "";
    document.querySelector("#theme").value = result.theme || "Default";
    document.querySelector("#image").value = result.image || "";
    /*
     * Need to figure out how to set default value for checkboxes.
     * Doing "...|| true;" always returns true, and seems to
     * override the saved value.  It's weird.
     */
    document.querySelector("#weather").checked = result.weather;
    // Check value, remove for production
    console.log(document.querySelector('#weather').checked);
    // Hide image-specific settings unless needed
    displayImageSettings();
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(["color", "theme", "weather"]);
  getting.then(setCurrentChoice, onError);
}

// Troubleshooting, remove for production!!!
function consoleHelp() {
  console.log(document.querySelector("#weather").checked);
}

//runs restoreOptions when page is loaded
document.addEventListener("DOMContentLoaded", restoreOptions);
//runs saveOptions when submit button is clicked
document.querySelector("form").addEventListener("submit", saveOptions);
// Remove in production!!!
document.querySelector("#weather").addEventListener("change", consoleHelp);
