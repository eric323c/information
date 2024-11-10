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

    // Fetch and display documents on page load
    fetchDocuments();
});

// Function to copy script text and provide feedback
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
            console.error('Failed to copy text using fallback method: ', err);
            alert('Copy failed, please try again.');
        }
        
        document.body.removeChild(tempTextArea);
    });
}

// Function to show 'Copied!' feedback
function showCopiedFeedback(buttonId) {
    const button = document.getElementById(buttonId);
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy';
    }, 2000); // Reset after 2 seconds
}

function visitWebsite(url) {
    window.open(url, '_blank');
}

function previewDocument(url) {
    window.open(url, '_blank');
}

function downloadDocument() {
    alert('Downloading document...');
}

// Function to open VA Guide in a new window with input fields
function openVAGuide() {
    const guideContent = `
        <html>
        <head>
            <title>VA Reporting Guide</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                h2 { font-weight: bold; }
                p { margin: 5px 0; }
                hr { margin: 10px 0; }
                label { font-weight: bold; margin-top: 10px; display: block; }
                input[type="text"], .uneditable-text { 
                    width: 100%; 
                    padding: 5px; 
                    margin: 5px 0 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 4px; 
                    display: block;
                }
                .uneditable-text { 
                    background-color: #f3f3f3; 
                    border: none; 
                    padding: 5px; 
                }
                button { 
                    margin-top: 15px; 
                    padding: 8px 12px; 
                    background-color: #4CAF50; 
                    color: white; 
                    border: none; 
                    border-radius: 4px; 
                    cursor: pointer; 
                }
                button:hover { background-color: #45a049; }
            </style>
        </head>
        <body>
            <h2>VA Reporting Guide</h2>
            <p><strong>Facility Information –</strong></p>
            <p>Name: Penn State Health St. Joseph Medical Center</p>
            <p>Phone: 610-378-2595</p>
            <p>NPI: 1699734665</p>
            <p>Tax ID: 231352211</p>
            <p>Address: 2500 Bernville Rd, Reading PA, 19605, United States</p>
            <hr>
            <p><strong>Point of Contact Information –</strong></p>
            <p>Name: UR (Utilization Review)</p>
            <p>Phone Number: 610-378-2479</p>
            <p>Fax Number: 610-378-2395</p>
            <p>Department: Utilization Review</p>
            <p>Email: ur@pennstatehealth.psu.edu</p>
            <hr>

            <!-- Temporary Information Form -->
            <h3>Temporary Information</h3>
            <label>First Name:</label> <input type="text" id="firstName" placeholder="Enter first name">
            <label>Last Name:</label> <input type="text" id="lastName" placeholder="Enter last name">
            <label>Gender:</label> <input type="text" id="gender" placeholder="M/F">
            <label>DOB:</label> <input type="text" id="dob" placeholder="MM/DD/YYYY">
            <label>SSN:</label> <input type="text" id="ssn" placeholder="SSN">
            <label>Address:</label> <input type="text" id="address" placeholder="Enter address">
            <label>Chief Complaint:</label> <input type="text" id="chiefComplaint" placeholder="Enter complaint">
            <label>Date/Time of Arrival:</label> <input type="text" id="arrivalTime" placeholder="MM/DD/YYYY HH:MM AM/PM">
            <label>Ambulance:</label> <input type="text" id="ambulance" placeholder="Y/N">
            <label>Admitted:</label> <input type="text" id="admitted" placeholder="Y/N">
            <label>VA Form Completion:</label> <input type="text" id="vaFormCompletion" placeholder="Enter form details">

            <button onclick="submitVAForm()">Submit</button>

            <script>
                function submitVAForm() {
                    // Get all input elements
                    const inputs = document.querySelectorAll('input[type="text"]');
                    
                    inputs.forEach(input => {
                        // Create an uneditable text element to replace the input
                        const uneditableText = document.createElement('div');
                        uneditableText.className = 'uneditable-text';
                        uneditableText.textContent = input.value || "N/A";
                        
                        // Replace input with uneditable text
                        input.parentNode.replaceChild(uneditableText, input);
                    });
                }
            </script>
        </body>
        </html>
    `;

    const guideWindow = window.open("", "VA Guide", "width=400,height=600");
    guideWindow.document.write(guideContent);
    guideWindow.document.close();
}