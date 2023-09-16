chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (
    request.request.url ==
    "https://api-ng2.myperfectice.com/api/v1/learningTest/getQuestion"
  ) {
    request.getContent(function (content, encoding) {
      var myobj = JSON.parse(content);

      if (myobj.coding.length != 0) {
        console.log(myobj.coding);
        let i = myobj.coding[0]
        if (i != -1) {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              var activeTab = tabs[0];
              //Sending message to the active tab
              chrome.tabs.sendMessage(activeTab.id, {
                msg: "Data is getting send",
                keys: i,
                quesType: "coding"
              });
            }
          );
        }
      }
      else {
        console.log(myobj.answers);
        //Finding the correct Answere
        let i = findCorrectAns(myobj.answers);
        if (i != -1) {
          console.log("Correct Answer is: " + i);
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              var activeTab = tabs[0];
              //Sending message to the active tab
              chrome.tabs.sendMessage(activeTab.id, {
                msg: "Data is getting send",
                keys: i,
                quesType: "mcq"
              });
            }
          );
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "startPanel") {
    console.log("Panel will start its work!");
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
      request.getContent(function (content, encoding) {
        if (isJsonString(content)) {
          var myobj = JSON.parse(content);
          console.log(myobj.question);
          if (myobj.question) {
            if (myobj.question.coding.length != 0) {
              let i = myobj.question.coding[0]
              chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                  var activeTab = tabs[0];
                  //Sending message to the active tab
                  chrome.tabs.sendMessage(activeTab.id, {
                    msg: "Data is getting send",
                    keys: i,
                    quesType: "coding"
                  });
                }
              );
            }
            else {
              let i = findCorrectAns(myobj.question.answers);
              console.log("Correct Answer is: " + i);
              chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                  var activeTab = tabs[0];
                  //Sending message to the active tab
                  chrome.tabs.sendMessage(activeTab.id, {
                    msg: "Data is getting send",
                    keys: i,
                    quesType: "mcq"
                  });
                }
              );
            }
          }
        }
      });
    });
  }
});

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function findCorrectAns(answers) {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrectAnswer) {
      return i;
    }
  }
  return -1;
}

function copyToClipboard(ansKey) {
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
}