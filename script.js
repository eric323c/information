// Initialize Supabase
const supabase = createClient(
    'https://ydadnbbobjvwusyjgaxa.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYWRuYmJvYmp2d3VzeWpnYXhhIiwicm9sZSIsInNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTczNDA3MCwiZXhwIjoyMDQ3MzEwMDcwfQ.eKiVVJUyb1UaRiO97CvH6hwO5FbCvS0pnA7t1-48EUM'
);

// Login/Signup state
let isLogin = true;

function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    updateModalState();
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function updateModalState() {
    const modalTitle = document.getElementById('modalTitle');
    const authActionButton = document.getElementById('authActionButton');
    const toggleAuthMessage = document.getElementById('toggleAuthMessage');

    if (isLogin) {
        modalTitle.textContent = 'Login';
        authActionButton.textContent = 'Login';
        toggleAuthMessage.innerHTML = `Don't have an account? <a href="#" id="toggleAuthLink">Sign up</a>`;
    } else {
        modalTitle.textContent = 'Sign up';
        authActionButton.textContent = 'Sign up';
        toggleAuthMessage.innerHTML = `Already have an account? <a href="#" id="toggleAuthLink">Login</a>`;
    }

    document.getElementById('toggleAuthLink').addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        updateModalState();
    });
}

// Handle Login/Signup
document.getElementById('authActionButton').addEventListener('click', async () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(`Login Error: ${error.message}`);
        } else {
            alert('Logged in successfully!');
            closeAuthModal();
        }
    } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(`Signup Error: ${error.message}`);
        } else {
            alert('Signup successful! Please verify your email.');
            closeAuthModal();
        }
    }
});

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

// Open VA Guide
function openVAGuide() {
    const guideContent = `
        <html>
        <head><title>VA Reporting Guide</title></head>
        <body>
            <h2>VA Reporting Guide</h2>
            <p>Facility Info: Penn State Health St. Joseph</p>
            <!-- Add form elements and static info here -->
        </body>
        </html>
    `;
    const guideWindow = window.open("", "VA Guide", "width=400,height=600");
    guideWindow.document.write(guideContent);
    guideWindow.document.close();
}
