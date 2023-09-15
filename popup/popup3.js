console.log("Popup Script Fired!");

//Run the sunctions after the contents are loaded
document.addEventListener("DOMContentLoaded", runFunction);

function runFunction() {
  // alert("Content Loaded!")
  document.getElementById("button").addEventListener("click", sendKeys);

  function sendKeys() {
    //Getting the current tab details
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs) {
        var activeTab = tabs[0];
        //Sending message to the active tab
        chrome.tabs.sendMessage(activeTab.id, { msg: "start" });
      }
    );
  }
}