chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "Data is getting send") {
    if (message.quesType == "coding") {
      let ansKey = message.keys.solution;
      console.log(ansKey);
      setTimeout(attemptCoding(ansKey), 3000)
    }

    if (message.quesType == "mcq") {
      let ansKey = message.keys;
      attemptMcq(ansKey);
    }
  }

  if (message.msg == "start") {
    chrome.runtime.sendMessage({ msg: "startPanel" });
  }
});

function attemptCoding(ansKey) {
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

function attemptMcq(ansKey) {
  setTimeout(function () {

    const checkBox = document.querySelector(`#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.adaptive-question-box.bg-white.p-1.ng-star-inserted > div:nth-child(2) > mcq-question > div > div.question-answers.mb-0 > div:nth-child(${ansKey + 1}) > div > div > div > label > span`)

    if(checkBox)
    {
      checkBox.click()
    }
    else
    {
      document.querySelector(`div.question-answers.mb-0 > div:nth-child(${ansKey + 1}) > div > div > div > label > span.checkmark`).click()
    }

    const pageWrapper = document.querySelector("#page-wrapper");

    const saveAndNextButton = pageWrapper.querySelector(
      "div.d-block.d-lg-none.fixed-bottom.ng-star-inserted a.btn-primary"
    );

    if (saveAndNextButton) {
      saveAndNextButton.click();
    }
  }, 3000);

  setTimeout(() => {
    const nextbtn = document.querySelector(
      "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted>div.no-gutters> div:nth-child(2)> a.btn.btn-primary"
    );
    if (!nextbtn) {
      document
        .querySelector(
          "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted>div.no-gutters> div:nth-child(1)> a.btn.btn-primary"
        )
        .click();
    } else {
      nextbtn.click();
    }
  }, 4000);
}
