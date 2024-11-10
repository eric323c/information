// JavaScript to manage the interactive guide

let currentStep = 0;
const steps = [
    {
        element: "#scriptsSection",
        text: "This is the Scripts section. Here, you can view and copy important registration scripts.",
        action: () => {}
    },
    {
        element: "#copyButton",
        text: "Click this button to copy the current script. You’ll see a ‘Copied’ message after.",
        action: () => {}
    },
    {
        element: "#documentSection",
        text: "These are your Documents. Icons here indicate types of documents available.",
        action: () => {}
    },
    {
        element: "#vaGuideButton",
        text: "Click this VA Guide button to open a special module for VA reporting information.",
        action: () => {}
    },
    // Add further steps for each key section
];

function startGuide() {
    currentStep = 0;
    document.getElementById("startGuideModal").style.display = "none";
    document.getElementById("guideOverlay").style.display = "flex";
    showStep();
}

function showStep() {
    const step = steps[currentStep];
    const element = document.querySelector(step.element);
    
    if (element) {
        const rect = element.getBoundingClientRect();
        document.getElementById("guideText").innerText = step.text;
        
        document.getElementById("highlightBox").style.top = `${rect.top}px`;
        document.getElementById("highlightBox").style.left = `${rect.left}px`;
        document.getElementById("highlightBox").style.width = `${rect.width}px`;
        document.getElementById("highlightBox").style.height = `${rect.height}px`;
        
        step.action();
    }
}

function nextStep() {
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

function endGuide() {
    document.getElementById("guideOverlay").style.display = "none";
    currentStep = 0;
}

function openGuide() {
    document.getElementById("startGuideModal").style.display = "block";
}

function closeGuide() {
    document.getElementById("startGuideModal").style.display = "none";
}

document.getElementById("helpButton").addEventListener("click", openGuide);
document.getElementById("closeGuideButton").addEventListener("click", endGuide);
document.getElementById("nextStepButton").addEventListener("click", nextStep);