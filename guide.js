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
        text: "These are your Documents. Icons here indicate types of documents available.",
        action: () => { /* No special action */ }
    },
    {
        element: "#vaGuideButton",
        text: "Click this VA Guide button to open a special module for VA reporting information.",
        action: () => document.querySelector("#vaGuideButton").click()
    },
    // Add more steps as needed for other elements
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
        
        // Highlight the element (optional)
        element.style.border = "2px solid #3e5068";
        step.action(); // Perform any action needed for this step
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
