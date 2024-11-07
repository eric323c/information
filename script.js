// Define cloud name and unsigned preset for Cloudinary, if needed later
const cloudName = 'doh6v6ofz';
const unsignedPreset = 'Information';

// Function to preview a document
function previewFile(filePath) {
    document.getElementById('filePreview').src = filePath;
}

// Function to copy the script text
function copyScript() {
    const scriptText = document.querySelector('.quick-script p').textContent;
    navigator.clipboard.writeText(scriptText).then(() => {
        alert("Script copied to clipboard!");
    }).catch(err => console.error('Failed to copy text: ', err));
}

// Sidebar navigation functionality to switch sections
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
        document.querySelectorAll('.sidebar a').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

// Function to search within the sidebar
function searchSite() {
    const filter = document.getElementById('siteSearch').value.toUpperCase();
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        const txtValue = link.textContent || link.innerText;
        link.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    });
}

// Make functions accessible for HTML inline events
window.previewFile = previewFile;
window.copyScript = copyScript;
window.searchSite = searchSite;
