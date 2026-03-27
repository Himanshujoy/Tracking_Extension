# 📌 Tracking Extension

A simple and efficient Chrome Extension to track applications (jobs, internships, etc.) with status updates, filtering, and export features.

---

## 🚀 Features

* ✅ Add and manage application entries
* 🎯 Status tracking (Submitted, Accepted, Rejected, Others)
* 🎨 Color-coded status for quick visibility
* 🔍 Search across Name, ID, Description
* 🧩 Filter by status (including "Other")
* ✏️ Editable status directly in table
* 📅 Auto-update "Last Updated" field
* 📥 Download data as:

  * CSV
  * Excel (.xlsx)
* 🔗 Auto-fill current tab link with "Use" button

---

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript
* Chrome Extension APIs (`chrome.storage`)
* SheetJS (for Excel export)

---

## 📦 External Library

This project uses **SheetJS** for Excel export.

### 🔗 Download:

https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js

### 📌 Setup:

1. Download the file
2. Place it in your project root
3. Include it in `show.html`:

```html
<script src="xlsx.full.min.js"></script>
```

---

## 📂 Project Structure

```
Tracking_Extension/
│── manifest.json
│── popup.html
│── show.html
│── styles.css
│── show.js
│── popup.js
│── xlsx.full.min.js
│── icons/
```

---

## ⚙️ Installation (Local Setup)

1. Clone the repository:

   ```
   git clone https://github.com/Himanshujoy/Tracking_Extension.git
   ```

2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer Mode** (top right)

4. Click **Load unpacked**

5. Select the project folder

---

## 🧪 Step-by-Step Usage

### ➤ 1. Open Extension

* Click on the extension icon in Chrome toolbar

---

### ➤ 2. Add Application

* Fill:

  * Name
  * ID
  * Description
  * Link
* Click **Use** to auto-fill current tab URL (optional)

---

### ➤ 3. Save Entry

* Add the entry (via your popup form)

---

### ➤ 4. View Applications

* Open the **Show tab / table view**

---

### ➤ 5. Edit Status

* Click on **Status column**
* Modify value (e.g., Submitted, Accepted, Rejected, etc.)

---

### ➤ 6. Apply Changes

* Click **Update** button
* "Last Updated" field updates automatically

---

### ➤ 7. Search & Filter

* 🔍 Use search bar to find entries
* 🎯 Use dropdown to filter by status

  * Includes "Other" for custom statuses

---

### ➤ 8. Download Data

* Click **Download**

  * Choose **CSV** or **Excel**
* File will be downloaded locally

---

## 💾 Data Storage

* Data is stored using:

  ```
  chrome.storage.local
  ```
* Stored locally in your browser
* Data persists across sessions
* Export recommended for backup

---

## ⚠️ Limitations

* ❌ Data is not synced across devices
* ❌ Data is deleted if extension is removed
* ❌ No cloud backup

---

## 🔮 Future Improvements

* 🔽 Replace status input with dropdown
* 📊 Add dashboard (stats: Accepted / Rejected)
* ☁️ Cloud sync (Firebase/Supabase)
* 🔔 Notifications / reminders
* 📱 Better UI/UX (modern dashboard style)

---

## 👨‍💻 Author

**Himanshu Srivastava**

---

## ⭐ Contributing

Feel free to fork, improve, and submit PRs!

---

## 📄 License

This project is open-source and available under the MIT License.
