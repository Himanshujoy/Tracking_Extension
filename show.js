let globalData = [];
let filteredData = [];

// =======================
// LOAD TABLE
// =======================
function loadTable() {
  chrome.storage.local.get(["data"], (result) => {
    globalData = result.data || [];
    filteredData = [...globalData];
    renderTable(filteredData);
  });
}


// =======================
// RENDER TABLE
// =======================
function renderTable(data) {
  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.date || ""}</td>
      <td>${row.name || ""}</td>
      <td>${row.id || ""}</td>
      <td>${row.desc || ""}</td>
      <td><a href="${row.link}" target="_blank">Link</a></td>
      <td contenteditable="true" class="status-cell">${row.status || ""}</td>
      <td>${row.lastUpdated || ""}</td>
    `;

    const statusCell = tr.querySelector(".status-cell");
    applyStatusColor(statusCell, row.status || "");

    tbody.appendChild(tr);
  });
}


// =======================
// STATUS COLOR LOGIC
// =======================
function applyStatusColor(cell, status) {
  if (!cell) return;

  const s = (status || "").toLowerCase().trim();

  cell.style.fontWeight = "500";
  cell.style.borderRadius = "6px";
  cell.style.textAlign = "center";

  if (s === "submitted") {
    cell.style.backgroundColor = "#facc15";
    cell.style.color = "black";
  } 
  else if (s === "rejected") {
    cell.style.backgroundColor = "#ef4444";
    cell.style.color = "white";
  } 
  else if (s === "accepted") {
    cell.style.backgroundColor = "#166534";
    cell.style.color = "white";
  } 
  else {
    cell.style.backgroundColor = "#4ade80";
    cell.style.color = "black";
  }
}


// =======================
// SEARCH + FILTER
// =======================
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);

function applyFilters() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const statusValue = document.getElementById("statusFilter").value;

  filteredData = globalData.filter(row => {
    const matchesSearch =
      (row.name || "").toLowerCase().includes(searchText) ||
      (row.id || "").toLowerCase().includes(searchText) ||
      (row.desc || "").toLowerCase().includes(searchText);

    const matchesStatus =
      statusValue === "all" ||
      (statusValue === "other"
        ? !["submitted", "accepted", "rejected"].includes((row.status || "").toLowerCase())
        : (row.status || "").toLowerCase() === statusValue);


    return matchesSearch && matchesStatus;
  });

  renderTable(filteredData);
}


// =======================
// UPDATE BUTTON (FIXED)
// =======================
document.getElementById("update").addEventListener("click", () => {
  const rows = document.querySelectorAll("#table tbody tr");

  rows.forEach((tr) => {
    const id = tr.children[2].innerText.trim();
    const status = tr.children[5].innerText.trim();

    const original = globalData.find(r => (r.id || "") === id);

    if (original && status !== (original.status || "")) {
      original.status = status;
      original.lastUpdated = new Date().toISOString().split("T")[0];
    }

    const statusCell = tr.children[5];
    applyStatusColor(statusCell, status);
  });

  chrome.storage.local.set({ data: globalData }, () => {
    console.log("Updated!");
    loadTable();
  });
});


// =======================
// DOWNLOAD CSV
// =======================
document.getElementById("downloadCsv").addEventListener("click", () => {
  let csv = "Date,Name,ID,Description,Link,Status,Last Updated\n";

  globalData.forEach(row => {
    csv += `${row.date || ""},${row.name || ""},${row.id || ""},${row.desc || ""},${row.link || ""},${row.status || ""},${row.lastUpdated || ""}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "applications.csv";
  a.click();
});


// =======================
// DOWNLOAD EXCEL
// =======================
document.getElementById("downloadExcel").addEventListener("click", () => {
  const excelData = globalData.map(row => ({
    Date: row.date || "",
    Name: row.name || "",
    ID: row.id || "",
    Description: row.desc || "",
    Link: row.link || "",
    Status: row.status || "",
    "Last Updated": row.lastUpdated || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

  XLSX.writeFile(workbook, "applications.xlsx");
});


// =======================
// INIT
// =======================
loadTable();