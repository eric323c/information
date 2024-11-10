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
    {
        element: "#helpButton",
        text: "This button allows you to start the guide anytime you need help.",
        action: () => { /* No special action */ }
    }
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

    // Remove previous highlights
    document.querySelectorAll(".highlighted").forEach(el => el.classList.remove("highlighted"));

    if (element) {
        // Highlight the current element
        element.classList.add("highlighted");

        // Position the guide text box near the highlighted element
        const rect = element.getBoundingClientRect();
        const guideTextBox = document.getElementById("guideTextBox");
        guideTextBox.style.top = `${rect.top + window.scrollY - 10}px`;
        guideTextBox.style.left = `${rect.left + rect.width + 10}px`;
        
        // Set the guide text
        document.getElementById("guideText").innerText = step.text;
        guideTextBox.style.display = "block";

        // Perform any action needed for this step
        step.action();
    }
}

// Move to the next step
function nextStep() {
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
    document.getElementById("guideTextBox").style.display = "none";
    document.querySelectorAll(".highlighted").forEach(el => el.classList.remove("highlighted"));
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