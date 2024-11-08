document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const resourceContainer = document.getElementById('resourceContainer');
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const resourceItems = Array.from(document.querySelectorAll('.resource-item'));

    function updateVisibleResources(section) {
        document.querySelector('.content h2').textContent = section === 'home' ? 'All Resources' : section.charAt(0).toUpperCase() + section.slice(1);
        resourceItems.forEach(item => {
            item.style.display = section === 'home' || item.getAttribute('data-type') === section ? 'block' : 'none';
        });
    }

    updateVisibleResources('home');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
            updateVisibleResources(section);
        });
    });

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        resourceItems.forEach(item => {
            const isMatch = item.textContent.toLowerCase().includes(query);
            item.style.display = isMatch ? 'block' : 'none';
        });
    });
});

// Function to copy script text and provide feedback
function copyScript(text, buttonId) {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedFeedback(buttonId);
    }).catch(() => {
        // Fallback approach if navigator.clipboard fails
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        
        try {
            document.execCommand('copy');
            showCopiedFeedback(buttonId);
        } catch (err) {
            console.error('Failed to copy text using fallback method: ', err);
            alert('Copy failed, please try again.');
        }
        
        document.body.removeChild(tempTextArea);
    });
}

// Function to show 'Copied!' feedback
function showCopiedFeedback(buttonId) {
    const button = document.getElementById(buttonId);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000); // Reset after 2 seconds
}

function visitWebsite(url) {
    window.open(url, '_blank');
}

function previewDocument() {
    alert('Previewing document...');
}

function downloadDocument() {
    alert('Downloading document...');
}

function deleteDocument() {
    alert('Deleting document...');
}

function copyEmailTemplate() {
    alert('Email template copied!');
}
// script.js

async function fetchDocuments() {
    try {
        const response = await fetch('/api/getDocument');
        if (!response.ok) throw new Error("Failed to fetch documents");

        const documents = await response.json();
        displayDocuments(documents); // Call a function to display documents
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

// Function to display documents on the page
function displayDocuments(documents) {
    const resourceContainer = document.getElementById('resourceContainer');
    resourceContainer.innerHTML = ''; // Clear previous content

    documents.forEach(doc => {
        const resourceItem = document.createElement('div');
        resourceItem.className = 'resource-item';
        resourceItem.innerHTML = `
            <h3>${doc.title}</h3>
            <p>${doc.description}</p>
            <button onclick="previewDocument('${doc.fileUrl}')">Preview</button>
            <button onclick="downloadDocument('${doc.fileUrl}')">Download</button>
        `;
        resourceContainer.appendChild(resourceItem);
    });
}

// Call fetchDocuments when the page loads
document.addEventListener('DOMContentLoaded', fetchDocuments);
async function uploadDocument() {
    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert("Please select a document to upload.");
        return;
    }

    formData.append('document', fileInput.files[0]);

    try {
        const response = await fetch('/api/uploadDocument', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert("Document uploaded successfully!");
            // Optionally, refresh the list of documents to include the new one
            fetchDocuments();
        } else {
            alert("Failed to upload document.");
        }
    } catch (error) {
        console.error("Error uploading document:", error);
    }
}
