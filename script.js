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
async function uploadDocument() {
    const fileInput = document.getElementById('fileInput');
    
    // Check if a file is selected
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select a document to upload.");
        return;
    }
    
    const file = fileInput.files[0];
    
    // Prepare form data
    const formData = new FormData();
    formData.append('document', file);

    try {
        // Replace with your actual endpoint for uploading documents
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert("Document uploaded successfully.");
            // Optional: Reload the document list or update UI
        } else {
            throw new Error("Failed to upload document");
        }
    } catch (error) {
        console.error("Error uploading document:", error);
        alert("Error uploading document. Please try again.");
    }
}

// Function to fetch documents from MongoDB
async function fetchDocuments() {
    try {
        const response = await fetch('/api/getDocument');
        const documents = await response.json();
        displayDocuments(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
    }
}

// Function to display fetched documents
function displayDocuments(documents) {
    const container = document.getElementById('resourceContainer');
    container.innerHTML = '<h2>All Resources</h2>'; // Clear and reset the container
    documents.forEach(doc => {
        const docItem = document.createElement('div');
        docItem.classList.add('resource-item');
        docItem.innerHTML = `
            <h3>${doc.name}</h3>
            <button onclick="previewDocument('${doc.url}')">Preview</button>
            <button onclick="downloadDocument('${doc.url}')">Download</button>
        `;
        container.appendChild(docItem);
    });
}

// Call fetchDocuments to display existing documents on page load
fetchDocuments();
