let timeOut1 = null;
let timeOut2 = null;

let timeOut3 = null;
let timeOut4 = null;
let timeOut5 = null;
let timeOut6 = null;
let timeOut7 = null;
let timeOut8 = null;
let selectedLevel = null

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.msg == "Data is getting send") {
    if (message.quesType == "coding") {
      let ansKey = message.keys.solution;
      console.log(ansKey);
      console.log("Started Answering, (if not working then refresh the page)");
      setTimeout(attemptCoding(ansKey), 3000)
    }

    if (message.quesType == "mcq") {
      let ansKey = message.keys;
      console.log(ansKey + 1)
      setTimeout(attemptMcq(ansKey, true), 2000)
    }
  }
  else if (message.msg == "Not getting any data") {
    console.log(message.msg + " " + "Stopped Answering");
    clearTimeout(timeOut1);
    clearTimeout(timeOut2);
  }


  if (message.msg == "start") {
    // selectedLevel = message.slevel

    // for (let i = 1; i < 13; i++) {
    //   window.scrollTo({
    //     top: document.body.scrollHeight,
    //     behavior: 'smooth'
    //   });
    // }

    // const alltests = document.querySelectorAll(`.ng-star-inserted > .details_page_new__bg > div > div > div > #syllabus > div:nth-child(2) > div > div`)

    // const availableViews = document.querySelectorAll(`.ng-star-inserted > .details_page_new__bg > div > div > div > #syllabus > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > a:nth-child(2)`).length

    // const levelCheck = alltests[availableViews].querySelector(`div > .text-truncate > div > div:nth-child(1) > :nth-child(3) > div:nth-child(3)`).innerText

    // if (levelCheck == selectedLevel) {
    //   const resumeBtnHome = document.querySelector(`.ng-star-inserted > .details_page_new__bg > div > div > div:nth-child(2) > div > :first-child > a`)

    //   resumeBtnHome.click()

    //   document.querySelector(`.take-asses-btn > a`).click()

    //   document.querySelector(`.asses-about-area > :nth-child(2) > :nth-child(2)`).click()

    //   chrome.runtime.sendMessage({ msg: "startPanel" });
    // }
    chrome.runtime.sendMessage({ msg: "startPanel" });
  }

  if (message.msg == "stop") {
    chrome.runtime.sendMessage({ msg: "stopPanel" });
    clearTimeout(timeOut3);
    clearTimeout(timeOut4);
    clearTimeout(timeOut5);
    clearTimeout(timeOut6);
    clearTimeout(timeOut7);
    clearTimeout(timeOut8);
  }
});

function openTest() {
  // for (let i = 1; i < 13; i++) {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: 'smooth'
  //   });
  // }

  // const alltests = document.querySelectorAll(`.ng-star-inserted > .details_page_new__bg > div > div > div > #syllabus > div:nth-child(2) > div > div`)

  // const availableViews = document.querySelectorAll(`.ng-star-inserted > .details_page_new__bg > div > div > div > #syllabus > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > a:nth-child(2)`).length

  // const levelCheck = alltests[availableViews].querySelector(`div > .text-truncate > div > div:nth-child(1) > :nth-child(3) > div:nth-child(3)`).innerText

  // if (levelCheck == selectedLevel) {
  var resumeBtnHome = null
  timeOut3 = setTimeout(() => {
    resumeBtnHome = document.querySelector(`.ng-star-inserted > .details_page_new__bg > div > div > div:nth-child(2) > div > :first-child > a`)
  }, 1000)

  timeOut4 = setTimeout(() => {
    resumeBtnHome.click()
  }, 2000)

  timeOut5 = setTimeout(() => {
    document.querySelector(`.take-asses-btn > a`).click()
  }, 3000)

  timeOut6 = setTimeout(() => {
    document.querySelector(`.asses-about-area > :nth-child(2) > :nth-child(2)`).click()
  }, 4000)
  // }
}

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
  timeOut1 = setTimeout(async () => {
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


  timeOut2 = setTimeout(() => {
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
    clearTimeout(timeOut1);
    clearTimeout(timeOut2);
    setTimeout(() => {
      document.querySelector('.finish-btn > a').click();
      timeOut7 = setTimeout(() => {
        document.querySelector(`attempt-overview > div > div > :nth-child(3) > a`).click();
      }, 2000)

      timeOut8 = setTimeout(() => {
        openTest()
      }, 4000)
    }, 1000)
  }
}
