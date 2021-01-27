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
        var jsonURLObject = JSON.stringify(urlObject);

        //Save the object to local forage Indexed DB 
        localforage.setItem(urlObject.id, jsonURLObject).then(function (value) {
        }).catch(function (err) {
            console.log(err);
        });
    });
    
} 

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('saveLinkButton').addEventListener('click', saveURL);
});