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

    // Add a listener to the button click event
    document.getElementById("button").addEventListener("click", sendKeys);
}

function sendKeys() {
    // Get the current tab details
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        // Check if the activeTab exists
        if (activeTab) {
            // Get the URL of the current tab
            var currentUrl = activeTab.url;

            if (currentUrl.includes("take-test")) {
                // Replace 'take-test' with 'learning-test' in the URL
                var newUrl = currentUrl.replace('take-test', 'learning-test');

                // Update the URL of the current tab and reload the page
                chrome.tabs.update(activeTab.id, { url: newUrl }, function () {
                    // The page is now reloaded, so send the message
                    chrome.tabs.sendMessage(activeTab.id, { msg: "start" });
                });
            }
            else {
                // The page is already loaded, so send the message
                chrome.tabs.sendMessage(activeTab.id, { msg: "start" });
            }
        }
    });
}
