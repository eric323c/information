const cloudName = 'doh6v6ofz'; // Your Cloudinary cloud name
const unsignedPreset = 'Information'; // Your unsigned preset name

// Function to handle file selection
function handleFileSelect(event) {
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = ''; // Clear previous previews

    Array.from(event.target.files).forEach(file => {
        const filePreview = document.createElement('p');
        filePreview.textContent = file.name;
        previewArea.appendChild(filePreview);
    });
}

// Function to upload file(s) to Cloudinary
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    
    if (files.length === 0) {
        alert("Please select a file to upload.");
        return;
    }

    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = ''; // Clear previews for new uploads

    for (let file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', unsignedPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.secure_url) {
                const fileLink = document.createElement('p');
                fileLink.innerHTML = `Uploaded Successfully: <a href="${data.secure_url}" target="_blank">${file.name}</a>`;
                previewArea.appendChild(fileLink);

                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = data.secure_url;
                    previewArea.appendChild(img);
                }
            } else {
                alert(`Failed to upload ${file.name}: ${data.error.message}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert(`Error uploading ${file.name}`);
        }
    }
}

// Function to search the sidebar
function searchSite() {
    const filter = document.getElementById('siteSearch').value.toUpperCase();
    const links = document.querySelectorAll('.sidebar a');

    links.forEach(link => {
        const txtValue = link.textContent || link.innerText;
        link.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    });
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

// Make functions accessible for HTML inline events
window.handleFileSelect = handleFileSelect;
window.uploadFile = uploadFile;
window.searchSite = searchSite;
