// JavaScript to manage the guide flow

let currentStep = 0;
const steps = [
    {
        element: "#scriptsSection",
        text: "This is the Scripts section. Here, you can view and copy important registration scripts.",
        action: () => { /* No special action */ }
    },
    {
        element: "#copyButton",
        text: "Click this button to copy the current script. You’ll see a ‘Copied’ message after.",
        action: () => document.querySelector("#copyButton").click()
    },
    {
        element: "#documentSection",
        text: "These are your Documents. Icons here indicate types of documents available. Click on a document to download or view more details.",
        action: () => { /* No special action */ }
    },
    {
        element: "#websiteSection",
        text: "This is the Websites section, where you can access important online resources. Click 'Visit' to open each site.",
        action: () => { /* No special action */ }
    },
    {
        element: "#searchBar",
        text: "Use this Search bar to quickly find documents, emails, or websites by typing keywords.",
        action: () => { /* No special action */ }
    },
    {
        element: "#sidebar",
        text: "This is the Sidebar. Navigate between Home, Documents, Emails, and Websites sections.",
        action: () => { /* No special action */ }
    },
    {
        element: "#vaGuideButton",
        text: "Click this VA Guide button to open a special module for VA reporting information. The module helps you fill out details easily.",
        action: () => document.querySelector("#vaGuideButton").click()
    },
    {
        element: "#resourceContainer",
        text: "Here are all your resources, categorized into Documents and Websites for quick access.",
        action: () => { /* No special action */ }
    },
    {
        element: "#helpButton",
        text: "This button at the bottom right opens the guide anytime you need assistance.",
        action: () => { /* No special action */ }
    },
    // Add more steps as needed for any other elements
];

// Start the guide by displaying the first step
function startGuide() {
    currentStep = 0;
    document.getElementById("startGuideModal").style.display = "none";
    document.getElementById("guideOverlay").style.display = "flex";
    showStep();
}

// Show the current step
function showStep() {
    const step = steps[currentStep];
    const element = document.querySelector(step.element);
    
    if (element) {
        const rect = element.getBoundingClientRect();
        document.getElementById("guideText").innerText = step.text;
        
        // Position guide text near the highlighted element
        document.getElementById("guideText").style.top = `${rect.top + window.scrollY + rect.height + 10}px`;
        document.getElementById("guideText").style.left = `${rect.left}px`;
        
        // Highlight the element
        element.style.border = "2px solid #3e5068";
        
        // Perform any action needed for this step
        step.action();
    }
}

// Move to the next step
function nextStep() {
    // Clear highlighting from previous element
    if (currentStep < steps.length) {
        document.querySelector(steps[currentStep].element).style.border = "";
    }
    
    currentStep++;
    if (currentStep < steps.length) {
        showStep();
    } else {
        endGuide();
    }
}

// Close the guide overlay
function endGuide() {
    document.getElementById("guideOverlay").style.display = "none";
    currentStep = 0;
}

// Open the initial modal
function openGuide() {
    document.getElementById("startGuideModal").style.display = "block";
}

// Close the initial modal
function closeGuide() {
    document.getElementById("startGuideModal").style.display = "none";
}

// Event listener for the help button
document.getElementById("helpButton").addEventListener("click", openGuide);