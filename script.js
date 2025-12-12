
// Load entries from localStorage 
let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

const entryText = document.getElementById("entryText");
const saveBtn = document.getElementById("saveBtn");
const entriesDiv = document.getElementById("entries");
const toggleBtn = document.getElementById("toggleMode");
const messageDiv = document.getElementById("message");
// To track if we are editing an entry || -1 means no edit in progress
let editIndex = -1;


// to clear the content and show all entries
function showEntries() {
    entriesDiv.innerHTML = "";




    // creates the div for each entry and adds edit and delete buttons with its styles(css)
    entries.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "entry";

        div.innerHTML = `
            <p>${item.text}</p>
            <small>${item.date}</small><br>
            <button class="editBtn" onclick="editEntry(${index})">Edit</button>
            <button class="deleteBtn" onclick="deleteEntry(${index})">Delete</button>
        `;
        // to join each entry div to the entries container
        entriesDiv.appendChild(div);
    });
}

// to save new entry or update existing
saveBtn.addEventListener("click", () => {
    const text = entryText.value.trim();

    if (text === "") {
        messageDiv.innerHTML = "⚠️ Please write something before saving!";
        return;
    } else {
        messageDiv.innerHTML = "";
    }

    if (editIndex !== -1) {
        // to update an existing entry both date and time
        entries[editIndex].text = text;
        entries[editIndex].date = new Date().toLocaleString();
        editIndex = -1;
        saveBtn.textContent = "Add Entry";
    } else {
        // creating a new entry
        const newEntry = {
            text: text,
            date: new Date().toLocaleString()
        };
        entries.push(newEntry);
    }

    // Save entries to localStorage
    localStorage.setItem("diaryEntries", JSON.stringify(entries));



    // Clear the textarea and refresh  to show a new entries 
    entryText.value = "";
    showEntries();
});

// editing the text and putting the entry text in the textarea to be edited
function editEntry(index) {
    entryText.value = entries[index].text;
    editIndex = index;
    saveBtn.textContent = "Update Entry";
}
// delete function
// to delete an entry then update localStorage and display
function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    showEntries();
}

// this is to save the dark mode preference and toggle the mode
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("darkMode", "enabled");
    } else {
        toggleBtn.textContent = "🌞";
        localStorage.setItem("darkMode", "disabled");
    }
});


if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "🌙";
} else {
    toggleBtn.textContent = "🌞";
}

// Display entries on page load
showEntries();
