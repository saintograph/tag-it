document.addEventListener("DOMContentLoaded", async function () {
  const entries = [];
  const keys = await localforage.keys();
  
  for (let i in keys) {
    const rawEntry = await localforage.getItem(keys[i]);
    try {
      const parsed = JSON.parse(rawEntry);
      if (parsed.id && !parsed.address.includes("chrome://")) {
        entries.push(parsed);
      }
    } catch(error) {
      // do nothing
      ;
    }
  }

  if (entries.length !== 0) {
    for (let i = 0; i < entries.length; i += 1) {
      const newAnchorTag = document.createElement("a");
      let newContent;
      if (entries[i].readingTime) {
        newContent = document.createTextNode(`Link: ${entries[i].address.split("//")[1].split("/")[0]}, Reading Time: ${entries[i].readingTime} minutes`);
      } else {
        newContent = document.createTextNode(`Link: ${entries[i].address.split("//")[1].split("/")[0]}`);
      }
      newAnchorTag.appendChild(newContent);

      // if (entries[i].readingTime) {
      //   console.log("TEST", entries[i].address.split("//")[1])
      //   newAnchorTag.title = `${entries[i].address.split("//")[1]}, Reading Time: ${entries[i].readingTime} minutes`;
      // } else {
      //   newAnchorTag.title = entries[i].address.split("//")[1];
      // }

      newAnchorTag.title = entries[i].address.split("//")[1];
      newAnchorTag.href = entries[i].address;
      newAnchorTag.target = "_blank"; // open link in new tab
      newAnchorTag.style.display = "block";

      document.body.appendChild(newAnchorTag);

    }
  }
});
