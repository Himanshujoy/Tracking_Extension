// Set default date
document.getElementById("date").valueAsDate = new Date();

// Use current tab URL
document.getElementById("useCurrent").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  document.getElementById("link").value = tab.url;
});

// Save data
document.getElementById("save").addEventListener("click", () => {
  const entry = {
    name: document.getElementById("name").value,
    id: document.getElementById("id").value,
    desc: document.getElementById("desc").value,
    link: document.getElementById("link").value,
    status: document.getElementById("status").value,
    date: document.getElementById("date").value,
    lastUpdated: document.getElementById("date").value
  };

  chrome.storage.local.get(["data"], (result) => {
    let data = result.data || [];
    data.push(entry);

    chrome.storage.local.set({ data }, () => {
      console.log("Saved!");
    });
  });
});

// Open show page
document.getElementById("show").addEventListener("click", () => {
  chrome.tabs.create({ url: "show.html" });
});