function getMonday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

const generateID = () => new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

const getCurrentTimeStamp = () => new Date().toJSON();

const openTab = () => chrome.tabs.create({ url: "chrome://newTab" });