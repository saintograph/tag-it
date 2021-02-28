function getMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

const generateID = () => new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

const getCurrentTimeStamp = () => new Date().toJSON();

const openTab = () => chrome.tabs.create({ url: "chrome://newTab" });

const notificationDialog = msg => {
  const notice = document.getElementById("notification-dialog");
  notice.innerHTML = msg;
  notice.style.display = "block";
  setTimeout(() => {
    notice.style.display = "none";
  }, 2000);
}

// credit: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const validURL = str => {
  const pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$','i');
  return !!pattern.test(str);
}