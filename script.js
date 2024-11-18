// DOM Content Loaded
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

// Copy script text
function copyScript(text, buttonId) {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedFeedback(buttonId);
    }).catch(() => {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
            document.execCommand('copy');
            showCopiedFeedback(buttonId);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Copy failed. Try again.');
        }
        document.body.removeChild(tempTextArea);
    });
}

// Show "Copied!" feedback
function showCopiedFeedback(buttonId) {
    const button = document.getElementById(buttonId);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000);
}

function visitWebsite(url) {
    window.open(url, '_blank');
}

function openVAGuide() {
    const guideContent = `
        <html>
        <head>
            <title>VA Reporting Guide</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    line-height: 1.6;
                }
                h2 {
                    font-weight: bold;
                }
                p {
                    margin: 5px 0;
                }
                hr {
                    margin: 10px 0;
                }
                label {
                    font-weight: bold;
                    margin-top: 10px;
                    display: block;
                }
                .info {
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <h2>VA Reporting Guide</h2>
            <div class="info">
                <strong>Facility Information:</strong>
                <p>Name: Penn State Health St. Joseph Medical Center</p>
                <p>Phone: 610-378-2595</p>
                <p>NPI: 1699734665</p>
                <p>Tax ID: 231352211</p>
                <p>Address: 2500 Bernville Rd, Reading PA, 19605, United States</p>
            </div>
            <hr>
            <div class="info">
                <strong>Point of Contact Information:</strong>
                <p>Name: UR (Utilization Review)</p>
                <p>Phone Number: 610-378-2479</p>
                <p>Fax Number: 610-378-2395</p>
                <p>Department: Utilization Review</p>
                <p>Email: ur@pennstatehealth.psu.edu</p>
            </div>
            <hr>
        </body>
        </html>
    `;

    // Open a new window for the VA Guide
    const guideWindow = window.open("", "VA Guide", "width=600,height=700");
    guideWindow.document.write(guideContent);
    guideWindow.document.close();
}
