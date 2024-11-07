function makeActive(id) {
    var sections = document.querySelectorAll('.sidebar a');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`[onclick="makeActive('${id}')"]`).classList.add('active');
}

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
