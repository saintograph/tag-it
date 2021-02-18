document.addEventListener("DOMContentLoaded", function () {
  const dummyLinks = ["link 1", "link 2", "link 3", "link 4"];

  for (let i = 0; i < dummyLinks.length; i += 1) {
    const newAnchorTag = document.createElement("a");
    const newContent = document.createTextNode(dummyLinks[i]);
    newAnchorTag.appendChild(newContent);
    newAnchorTag.title = dummyLinks[i];
    newAnchorTag.href = "http://example.com";
    newAnchorTag.target = "_blank"; // open link in new tab
    newAnchorTag.style.display = "block";

    document.body.appendChild(newAnchorTag);
  }
});