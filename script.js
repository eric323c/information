// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1BsRh0vxSHP6MRRStcPBFVdFxAykj_qY",
    authDomain: "information-7efaf.firebaseapp.com",
    projectId: "information-7efaf",
    storageBucket: "information-7efaf.appspot.com",
    messagingSenderId: "501827051484",
    appId: "1:501827051484:web:cead873c48843d99823919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);

// Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");

    // Enable file selection and upload once authenticated
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    document.getElementById('uploadButton').addEventListener('click', uploadFile);
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

// Handle file selection, preview, and show upload button
function handleFileSelect(event) {
    const files = event.target.files;
    const previewArea = document.getElementById('previewArea');
    const uploadButton = document.getElementById('uploadButton');
    previewArea.innerHTML = ''; // Clear existing previews

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const filePreview = document.createElement('div');
            filePreview.innerHTML = `
                <p>${file.name}</p>
                <embed src="${e.target.result}" width="100%" height="200px">
                <button onclick="window.open('${e.target.result}', '_blank')">Open</button>
                <button onclick="printDocument('${e.target.result}')">Print</button>
            `;
            previewArea.appendChild(filePreview);
        };
        reader.readAsDataURL(file);
    });

    uploadButton.style.display = files.length > 0 ? 'inline-block' : 'none';
}

// Function to upload files to Firebase Storage
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const previewArea = document.getElementById('previewArea');

    for (let file of files) {
        const storageRef = ref(storage, 'uploads/' + file.name);
        console.log("Uploading file:", file.name);

        try {
            await uploadBytes(storageRef, file);
            console.log("File uploaded:", file.name);

            // Append delete option for uploaded file
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `<span>${file.name}</span>
                <button class="delete-btn" onclick="deleteFile('${file.name}')">🗑️</button>`;
            previewArea.appendChild(fileItem);

            alert(`${file.name} uploaded successfully!`);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert(`Failed to upload ${file.name}`);
        }
    }

    fileInput.value = "";
    document.getElementById('uploadButton').style.display = 'none';
}

// Function to delete a file from Firebase Storage
async function deleteFile(fileName) {
    const confirmDelete = confirm(`Are you sure you want to delete ${fileName}?`);
    if (confirmDelete) {
        const storageRef = ref(storage, 'uploads/' + fileName);
        try {
            await deleteObject(storageRef);
            alert(`${fileName} has been deleted successfully!`);

            // Remove the file item from the preview area
            const previewArea = document.getElementById('previewArea');
            const fileItems = Array.from(previewArea.getElementsByClassName('file-item'));
            fileItems.forEach(item => {
                if (item.querySelector('span').textContent === fileName) {
                    previewArea.removeChild(item);
                }
            });
        } catch (error) {
            console.error("Error deleting file:", error);
            alert(`Failed to delete ${fileName}`);
        }
    }
}

// Print document function
function printDocument(fileUrl) {
    const printWindow = window.open(fileUrl, '_blank');
    printWindow.addEventListener('load', function() {
        printWindow.print();
        setTimeout(() => printWindow.close(), 100);
    });
}

// Copy script text function
function copyScript() {
    const scriptText = document.querySelector('.quick-script p').textContent;
    navigator.clipboard.writeText(scriptText).then(() => {
        const copyButton = document.querySelector('.quick-script button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy Script', 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
}

// Site search function to filter content sections
function searchSite() {
    let input = document.getElementById('siteSearch');
    let filter = input.value.toUpperCase();
    let sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        let txtValue = section.textContent || section.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}

// Make functions accessible globally for inline events in HTML
window.handleFileSelect = handleFileSelect;
window.uploadFile = uploadFile;
window.deleteFile = deleteFile;
window.printDocument = printDocument;
window.copyScript = copyScript;
window.searchSite = searchSite;
