// JavaScript for the guide functionality

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
    // Add more steps here as needed
];

// Start the guide by displaying the first step
function startGuide() {
    currentStep = 0;
    document.getElementById("startGuideModal").style.display = "none";
    document.getElementById("guideOverlay").style.display = "flex";
    showStep();
}

// Show the current step with highlighting and text
function showStep() {
    const step = steps[currentStep];
    const element = document.querySelector(step.element);
    const guideText = document.getElementById("guideText");

    if (element) {
        const rect = element.getBoundingClientRect();
        
        // Position the highlight box over the targeted element
        const highlightBox = document.getElementById("highlightBox");
        highlightBox.style.display = "block";
        highlightBox.style.top = `${rect.top + window.scrollY}px`;
        highlightBox.style.left = `${rect.left + window.scrollX}px`;
        highlightBox.style.width = `${rect.width}px`;
        highlightBox.style.height = `${rect.height}px`;

        // Display the guide text for the current step
        guideText.innerText = step.text;

        // Perform any action needed for this step
        step.action();
    }
}

// Move to the next step
function nextStep() {
    // Clear highlighting from the previous element
    document.getElementById("highlightBox").style.display = "none";

    currentStep++;
    if (currentStep < steps.length) {
        showStep();
    } else {
        endGuide();
    }
}

// Close the guide overlay and reset the guide
function endGuide() {
    document.getElementById("guideOverlay").style.display = "none";
    document.getElementById("highlightBox").style.display = "none";
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

// Event listeners for buttons
document.getElementById("helpButton").addEventListener("click", openGuide);
document.getElementById("nextStepButton").addEventListener("click", nextStep);
document.getElementById("closeGuideButton").addEventListener("click", endGuide);