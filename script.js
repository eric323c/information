// Function to handle copying the script text
function copyScript() {
    const scriptText = document.querySelector('.quick-script p').textContent;
    navigator.clipboard.writeText(scriptText).then(() => {
        const copyButton = document.getElementById('copyButton');
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy Script', 2000); // Reset after 2 seconds
    }).catch(err => console.error('Failed to copy text: ', err));
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
