let globalData = [];

function loadTable() {
  chrome.storage.local.get(["data"], (result) => {
    globalData = result.data || [];
    const tbody = document.querySelector("#table tbody");
    tbody.innerHTML = "";

    globalData.forEach((row, index) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.id}</td>
        <td>${row.desc}</td>
        <td><a href="${row.link}" target="_blank">Link</a></td>
        <td contenteditable="true">${row.status}</td>
        <td>${row.date}</td>
        <td>${row.lastUpdated}</td>
      `;

      tbody.appendChild(tr);
    });
  });
}

loadTable();


// =======================
// UPDATE BUTTON
// =======================
document.getElementById("update").addEventListener("click", () => {
  const rows = document.querySelectorAll("#table tbody tr");

  rows.forEach((tr, index) => {
    const status = tr.children[4].innerText;

    if (status !== globalData[index].status) {
      globalData[index].status = status;
      globalData[index].lastUpdated = new Date().toISOString().split("T")[0];
    }
  });

  chrome.storage.local.set({ data: globalData }, () => {
    alert("Updated!");
    loadTable();
  });
});


// =======================
// DOWNLOAD BUTTON
// =======================
document.getElementById("download").addEventListener("click", () => {
  let csv = "Name,ID,Description,Link,Status,Date,Last Updated\n";

  globalData.forEach(row => {
    csv += `${row.name},${row.id},${row.desc},${row.link},${row.status},${row.date},${row.lastUpdated}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  a.click();
});