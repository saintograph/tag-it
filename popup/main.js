/** function called from the button eventlistener */
function saveURL() {
  // Get the URL from the active tab
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    // validate url
    if (tabs.length !== 0 && validURL(tabs[0].url)) {
      const urlString = tabs[0].url;

      //JSON object for storing the data
      const urlObject = {
        id: generateID(),
        address: urlString,
        timestamp: getCurrentTimeStamp(),
      };

      const saveLink = new Promise(function (resolve, reject) {
        const modifyDOM = () => document.body.innerHTML;

        chrome.tabs.executeScript(
          {
            code: `(${modifyDOM})();`,
          },
          (results) => {
            const cleanText = results[0].replace(/<[^>]*>?/gm, "");
            const wordCount = cleanText.replace(/[^\w ]/g, "").split(/\s+/).length;

            const readingTime = Math.floor(wordCount / 228) + 1;
            urlObject.readingTime = readingTime;
            //Save the object to local forage Indexed DB
            localforage
              .setItem(urlObject.id, JSON.stringify(urlObject))
              .then(value => {
                // display notification that link was successfully saved
                notificationDialog("Link successfully saved!");
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        );
      });
      saveLink.then((response) => response).catch((err) => console.log(err));
    } else {
      notificationDialog("Invalid URL");
    }
  });
}

// save screenshots as base64 string
function saveScreenshot() {
  chrome.tabs.captureVisibleTab(null, function (img) {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();

        reader.readAsDataURL(blob);

        reader.onload = function () {
          const screenshotObject = new Object();
          screenshotObject.content = this.result;
          screenshotObject.id = generateID();
          //Save the object to local forage Indexed DB
          localforage
            .setItem(screenshotObject.id, screenshotObject.content)
            .then(value => {
              //display the image
              localforage
                .getItem(screenshotObject.id)
                .then(function (source) {
                  const image = new Image();
                  image.src = source;
                  const newWindow = window.open("", "_blank");
                  newWindow.document.write(image.outerHTML);
                  newWindow.resizeTo(
                    window.screen.availWidth / 2,
                    window.screen.availHeight / 2
                  );
                  newWindow.document.close();
                })
                .catch(function (err) {
                  console.log(err);
                });
              // end code to display image
            })
            .catch(function (err) {
              console.log(err);
            });
        };
      });
  });
}

const getReadingTime = async () => {
  const keys = await localforage.keys(); // asynchronously retrieve all keys
  let readingTime = 0;
  const dateMonday = await getMonday();

  if (keys.length === 0) {
    return [];
  }

  for (let i in keys) {
    const rawEntry = await localforage.getItem(keys[i]);
    // parse error free entries
    try {
      const parsed = JSON.parse(rawEntry);
      if (
        parsed.id &&
        parsed.readingTime &&
        new Date(parsed.timestamp).getTime() >= dateMonday.getTime()
      ) {

        readingTime = readingTime + parsed.readingTime;
      }
    } catch (error) {
      // if error or image, do nothing
    }
  }

  return readingTime;
}

document.addEventListener("DOMContentLoaded", async function () {
  document.getElementById("readingTime").innerText = await getReadingTime();
  document.getElementById("saveLinkButton").addEventListener("click", saveURL);
  document
    .getElementById("saveScreenShot")
    .addEventListener("click", saveScreenshot);
  document.getElementById("openNewTab").addEventListener("click", openTab);
});

exports.getReadingTime = getReadingTime;
