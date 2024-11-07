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

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewArea = document.getElementById('previewArea');
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
});

function printDocument(fileUrl) {
    const printWindow = window.open(fileUrl, '_blank');
    printWindow.addEventListener('load', function() {
        printWindow.print();
        setTimeout(() => printWindow.close(), 100);
    });
}

function copyScript() {
    const scriptText = document.querySelector('.quick-script p').textContent;
    navigator.clipboard.writeText(scriptText).then(() => {
        const copyButton = document.querySelector('.quick-script button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy Script', 2000); // Reset button text after 2 seconds
    }).catch(err => console.error('Failed to copy text: ', err));
}

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
