// code mirror work in progress

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.msg == "Data is getting send") {
        let ansKey = message.keys.solution;
        console.log(ansKey);

        // Wait for the CodeMirror element to be ready
        waitForCodeMirrorReady(function () {
            const codeMirrorInstance = getCodeMirrorInstance();

            if (codeMirrorInstance) {
                clearExistingCodeAndTypeNewCode(ansKey, codeMirrorInstance);
            } else {
                console.error("CodeMirror instance not found.");
            }
        });
    }

    if (message.msg == "start") {
        chrome.runtime.sendMessage({ msg: "startPanel" });
    }
});

function waitForCodeMirrorReady(callback) {
    // Replace 'yourCodeMirrorElement' with the actual selector of the CodeMirror element
    const codeMirrorElement = document.querySelector('.CodeMirror');

    if (codeMirrorElement && codeMirrorElement.CodeMirror) {
        callback(); // CodeMirror is ready
    } else {
        // Wait and check again
        setTimeout(function () {
            waitForCodeMirrorReady(callback);
        }, 100); // Adjust the wait time as needed
    }
}

function getCodeMirrorInstance() {
    const codeMirrorElement = document.querySelector('.CodeMirror');

    if (codeMirrorElement && codeMirrorElement.CodeMirror) {
        return codeMirrorElement.CodeMirror;
    }

    return null;
}

function clearExistingCodeAndTypeNewCode(newCode, codeMirrorInstance) {
    // Clear the existing content of the CodeMirror instance
    codeMirrorInstance.setValue("");

    // Insert the new code into the CodeMirror instance
    codeMirrorInstance.setValue(newCode);
}
