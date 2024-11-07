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
