document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.style.display = 'none');
        
        document.querySelectorAll('.sidebar a').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

function copyScript() {
    const scriptText = document.querySelector('.quick-script p').textContent;
    navigator.clipboard.writeText(scriptText).then(() => {
        const copyButton = document.querySelector('.quick-script button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy Script', 2000); // Reset button text after 2 seconds
    }).catch(err => console.error('Failed to copy text: ', err));
}
