function generateID() {

    var idString = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
    return idString;
}

function getCurrentTimeStamp() {

    var curTimeStamp = new Date().toJSON();
    return curTimeStamp;
}
/** function called from the button eventlistener */
function saveURL() {

    var urlString;
    // Get the URL from the active tab
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        urlString = tabs[0].url;

        //JSON object for storing the data
        var urlObject = new Object();
        urlObject.id = generateID();
        urlObject.address = urlString;
        urlObject.timestamp = getCurrentTimeStamp();
        const saveLink = new Promise(function (resolve, reject) {

            const modifyDOM = () => document.body.innerHTML;

            chrome.tabs.executeScript(
                {
                    code: `(${modifyDOM})();`,
                },
                (results) => {

                    const cleanText = results[0].replace(/<[^>]*>?/gm, '');
                    const wordCount = cleanText.replace(/[^\w ]/g, "").split(/\s+/).length;
                    const readingTime = Math.floor(wordCount / 228) + 1;
                    urlObject.readingTime = readingTime;
                    //Save the object to local forage Indexed DB 
                    localforage.setItem(urlObject.id, JSON.stringify(urlObject)).then(function (value) {
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            );

        })
        saveLink
            .then(response => response)
            .catch(err => console.log(err))
        
    });
    
} 

function saveScreenshot() {

    chrome.tabs.captureVisibleTab(null, function (img) {
        fetch(img).then(function (response) {
            return response.blob();
        }).then(function (blob) {

            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (function (f) {
                var screenshotObject = new Object();
                screenshotObject.content = this.result;
                screenshotObject.id = generateID();
                //Save the object to local forage Indexed DB 
                localforage.setItem(screenshotObject.id, screenshotObject.content).then(function (value) {

                    // Test code to display the image
                    localforage.getItem(screenshotObject.id).then(function (source) {
                        var image = new Image();
                        image.src = source;
                        var w = window.open("", '_blank');
                        w.document.write(image.outerHTML);
                        w.resizeTo(window.screen.availWidth / 2,
                            window.screen.availHeight / 2);
                        w.document.close();

                    }).catch(function (err) {
                        console.log(err);
                    });
                    // end test code to display image

                }).catch(function (err) {
                    console.log(err);
                });
                return function (e) {

                };
            });

        }).catch(console.log.bind(console));
    });

}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveLinkButton').addEventListener('click', saveURL);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveScreenShot').addEventListener('click', saveScreenshot);
});