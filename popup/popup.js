console.log("Popup Script Fired!");

// Run the functions after the contents are loaded
document.addEventListener("DOMContentLoaded", runFunction);

function runFunction() {

    // Get the link element
    const link = document.querySelector('a');
    // Add a click event listener to the link
    link.addEventListener('click', () => {
        // Open the link in a new tab when clicked
        chrome.tabs.create({ url: link.href });
    });

    const githubLink = document.querySelector('#github-link');
    githubLink.addEventListener('click', () => {
        chrome.tabs.create({ url: githubLink.href });
    });

    var slevel = document.getElementById('level-selector').value

    // Add a listener to the start button click event
    document.getElementById("start-button").addEventListener("click", startAnswering(slevel));

    // Add a listener for stop button click event
    document.getElementById("stop-button").addEventListener("click", stopAnswering);

    // Add a listener to the change interface button click event
    document.getElementById('inter-change').addEventListener('click', changeInterface);

}

function startAnswering(slevel) {
    // Get the current tab details
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        // Check if the activeTab exists
        if (activeTab) {
            // Get the URL of the current tab
            var currentUrl = activeTab.url;

            if (currentUrl.includes("learning-test")) {

                chrome.tabs.sendMessage(activeTab.id, { msg: "start", level: slevel });
            }
        }
    });
}

function changeInterface() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        if (activeTab) {
            var currentUrl = activeTab.url;

            if (currentUrl.includes('take-test')) {
                var newUrl = currentUrl.replace('take-test', 'learning-test');

                chrome.tabs.update(activeTab.id, { url: newUrl })
            }
        }
    })
}

function stopAnswering() {
    // Get the current tab details
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        // Check if the activeTab exists
        if (activeTab) {
            // Get the URL of the current tab
            var currentUrl = activeTab.url;

            if (currentUrl.includes("learning-test")) {

                chrome.tabs.sendMessage(activeTab.id, { msg: "stop" });
            }
        }
    });
}
