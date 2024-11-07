document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const cards = document.querySelectorAll('.card');
    const copyScriptButton = document.getElementById('copyScriptButton');

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        cards.forEach(card => {
            const isMatch = card.innerText.toLowerCase().includes(query);
            card.style.display = isMatch ? 'block' : 'none';
        });
    });

    // Copy script button functionality
    copyScriptButton.addEventListener('click', () => {
        navigator.clipboard.writeText("Patient script placeholder text")
            .then(() => {
                copyScriptButton.textContent = "Copied!";
                setTimeout(() => copyScriptButton.textContent = "Copy", 2000);
            });
    });

    // Placeholder for preview, download, delete, visit, copy actions
    document.querySelectorAll('.card button').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.className;
            if (action === 'preview') alert("Previewing document...");
            else if (action === 'download') alert("Downloading document...");
            else if (action === 'delete') alert("Deleting document...");
            else if (action === 'visit') alert("Visiting website...");
            else if (action === 'copy') {
                navigator.clipboard.writeText("Email template placeholder text");
                alert("Email template copied!");
            }
        });
    });
});