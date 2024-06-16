const uploadContainer = document.getElementById('uploadContainer');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('preview-container');
const preview = document.getElementById('preview');
const submitBtn = document.getElementById('submitBtn');
const additionalInputs = document.getElementById('additionalInputs');
const textInput = document.getElementById('textInput');
const addTextBtn = document.getElementById('addTextBtn');

uploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadContainer.style.borderColor = '#4CAF50';
});

uploadContainer.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadContainer.style.borderColor = '#cccccc';
});

uploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadContainer.style.borderColor = '#cccccc';
    const files = e.dataTransfer.files;
    if (files.length) {
        imageInput.files = files;
        handleImageUpload(files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleImageUpload(e.target.files[0]);
    }
});

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
        previewContainer.style.display = 'block'; // Show the preview container
        additionalInputs.style.display = 'block'; // Show the additional inputs
    };
    reader.readAsDataURL(file);
}

submitBtn.addEventListener('click', () => {
//    alert('Submit button clicked! You can handle the form submission here.');
});

addTextBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
        alert(`Applying watermark: ${text}`);
        // Here you can handle applying the watermark to the image
    } else {
        alert('Please enter watermark text.');
    }
});
