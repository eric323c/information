document.querySelectorAll('.sidebar a, .sidebar button').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar a, .sidebar button').forEach(nav => nav.classList.remove('active'));
        if (this.tagName === 'A') {
            this.classList.add('active');
        }
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function searchSite() {
    let input = document.getElementById('siteSearch');
    let filter = input.value.toUpperCase();
    let sections = document.querySelectorAll('.main-content section');
    sections.forEach(section => {
        let txtValue = section.textContent || section.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}
