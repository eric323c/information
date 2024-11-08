async function uploadDocument() {
    const fileInput = document.getElementById("fileInput");

    // Ensure a file has been selected
    if (!fileInput.files || fileInput.files.length === 0) {
        console.error("No file selected for upload.");
        alert("Please choose a file before uploading.");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("document", file);

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload document");
        }

        const result = await response.json();
        console.log("Document uploaded successfully:", result);
        alert("Document uploaded successfully!");
    } catch (error) {
        console.error("Error uploading document:", error);
        alert("Error uploading document: " + error.message);
    }
}
alert("Document uploaded successfully!");
fetchDocuments(); // This would refresh the list of documents dynamically
