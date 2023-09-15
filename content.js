chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "Data is getting send") {
    let ansKey = message.keys.solution;
    console.log(ansKey);

    setTimeout(function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(ansKey).then(
          function () {
            console.log("Copying to clipboard was successful!");
          },
          function (err) {
            console.error("Could not copy text: ", err);
          }
        );
      } else {
        // Clipboard API is not supported, provide a fallback or inform the user
        console.error("Clipboard API is not supported in this browser.");
      }
    }, 3000)
  }

  if (message.msg == "start") {
    chrome.runtime.sendMessage({ msg: "startPanel" });
  }
});
