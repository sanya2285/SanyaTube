// Show upload form when "+" button is clicked
const uploadButton = document.getElementById("uploadButton");
const uploadForm = document.getElementById("uploadForm");

uploadButton.addEventListener("click", () => {
    uploadForm.style.display = "block";
});

// Handle form submission
const uploadFormElement = document.getElementById("uploadForm");

uploadFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("videoFile");
    const titleInput = document.getElementById("videoTitle");
    const descriptionInput = document.getElementById("videoDescription");

    const formData = new FormData();
    formData.append("video", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("description", descriptionInput.value);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            alert("Video uploaded successfully!");
            uploadForm.reset();
            loadVideos(); // Reload videos after upload
        } else {
            alert("Error uploading video.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Load videos from server and display
async function loadVideos() {
    const videoGallery = document.getElementById("videoGallery");
    videoGallery.innerHTML = ""; // Clear current videos

    const response = await fetch("/videos");
    const videos = await response.json();

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video-item");

        videoElement.innerHTML = `
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <video controls width="400" src="${video.url}"></video>
        `;

        videoGallery.appendChild(videoElement);
    });
}

// Load videos on page load
document.addEventListener("DOMContentLoaded", loadVideos);
