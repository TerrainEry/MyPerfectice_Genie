chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "Data is getting send") {
    if (message.quesType == "coding") {
      let ansKey = message.keys.solution;
      console.log(ansKey);
      setTimeout(attemptCoding(ansKey), 3000)
    }

    if (message.quesType == "mcq") {
      let ansKey = message.keys;
      console.log(ansKey + 1)
      setTimeout(attemptMcq(ansKey),2000)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function attemptMcq(ansKey) {
  const pageWrapper = document.querySelector("#page-wrapper");
  setTimeout(async () => {
    var checkBox = document.querySelector(`.question-answers > div:nth-child(${ansKey + 1}) > div > label`)
    const saveAndNextButton = pageWrapper.querySelector("div.d-block.d-lg-none.fixed-bottom.ng-star-inserted a.btn-primary");

    if (checkBox) {
      checkBox.click();
      saveAndNextButton.click();
    }
    else {
      checkBox = document.querySelector(`.question-answers > div:nth-child(${ansKey + 1}) > div > label`);
      checkBox.click();
      saveAndNextButton.click();
    }
  }, 1000)


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
  }, 2000)

  const attemptedQues = document.querySelector(`.count > span:nth-child(1)`).innerText
  const TotalQues = document.querySelector(`.count > span:nth-child(3)`).innerText
  if (attemptedQues == TotalQues) {
    setTimeout(() => { document.querySelector('.finish-btn > a').click() }, 1000)
  }
}
