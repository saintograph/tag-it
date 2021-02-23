// this function creates a new tab in the user's browser and displays items in their database
document.addEventListener("DOMContentLoaded", async function () {
  // entries array for storing items from browser's localforage
  const entries = [];
  const keys = await localforage.keys(); // asynchronously retrieve all keys
  
  for (let i in keys) {
    const rawEntry = await localforage.getItem(keys[i]);
    // parse error free entries
    try {
      const parsed = JSON.parse(rawEntry);
      const age = (Date.now() - new Date(parsed.timestamp)) / (1000 * 60 * 60 * 24); // calculate age of entry

      // push entries which are not images or older than a week to entries array
      if (parsed.id && !parsed.address.includes("chrome://") && Math.ceil(age) < 8) {
        entries.push(parsed);
      }
    } catch(error) {
      // if error or image, do nothing
      ;
    }
  }

  if (entries.length !== 0) {
    for (let i = 0; i < entries.length; i += 1) {
      // create a new <a> tag
      const newAnchorTag = document.createElement("a");
      let newContent;

      if (entries[i].readingTime) {
        // display total reading time if available
        newContent = document.createTextNode(`Link: ${entries[i].address.split("//")[1].split("/")[0]}, Reading Time: ${entries[i].readingTime} minutes`);
      } else {
        newContent = document.createTextNode(`Link: ${entries[i].address.split("//")[1].split("/")[0]}`);
      }

      newAnchorTag.appendChild(newContent);
      newAnchorTag.title = entries[i].address.split("//")[1];
      newAnchorTag.href = entries[i].address;
      newAnchorTag.target = "_blank"; // open link in new tab
      newAnchorTag.style.display = "block";

      // append new <a> tag to body of web page
      document.body.appendChild(newAnchorTag);
    }
  }
});
