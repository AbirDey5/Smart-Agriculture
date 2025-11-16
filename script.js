// Page elements
const uploadPage = document.getElementById("upload-page");
const resultPage = document.getElementById("result-page");

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");

const resultImage = document.getElementById("resultImage");
const backBtn = document.getElementById("backBtn");

const expertBtn = document.getElementById("expertBtn");
const expertModal = document.getElementById("expertModal");
const closeModal = document.getElementById("closeModal");

// Handle image upload
imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            preview.src = reader.result;
            preview.style.display = "block";
            analyzeBtn.disabled = false;
        };

        reader.readAsDataURL(file);
    }
});

// Analyze image button
analyzeBtn.addEventListener("click", () => {
    resultImage.src = preview.src;

    uploadPage.classList.remove("active");
    resultPage.classList.add("active");
});

// Back button
backBtn.addEventListener("click", () => {
    resultPage.classList.remove("active");
    uploadPage.classList.add("active");

    imageInput.value = "";
    preview.style.display = "none";
    analyzeBtn.disabled = true;
});

// Expert review button
expertBtn.addEventListener("click", () => {
    expertModal.style.display = "flex";
});

// Close modal
closeModal.addEventListener("click", () => {
    expertModal.style.display = "none";
});

// Allow closing by clicking outside modal
window.addEventListener("click", (e) => {
    if (e.target === expertModal) {
        expertModal.style.display = "none";
    }
});
