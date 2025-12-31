document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');
    const capturedImage = document.getElementById('captured-image');
    const captureCanvas = document.getElementById('capture-canvas');
    const captureBtn = document.getElementById('capture-btn');
    const nextBtn = document.getElementById('next-btn');
    const cameraOverlay = document.querySelector('.camera-overlay');
    const toastContainer = document.getElementById('toast-container');

    let mediaStream = null;
    let photoDataUrl = null;

    async function startCamera() {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            cameraFeed.srcObject = mediaStream;
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access the camera. Please ensure permissions are granted.");
        }
    }

    function capturePhoto() {
        if (!mediaStream) return;

        const context = captureCanvas.getContext('2d');
        captureCanvas.width = cameraFeed.videoWidth;
        captureCanvas.height = cameraFeed.videoHeight;
        context.drawImage(cameraFeed, 0, 0, captureCanvas.width, captureCanvas.height);

        photoDataUrl = captureCanvas.toDataURL('image/png');

        capturedImage.src = photoDataUrl;
        cameraFeed.style.display = 'none';
        capturedImage.style.display = 'block';
        cameraOverlay.style.display = 'none';

        updateCaptureButtonState('retake');
        nextBtn.disabled = false;

        showToast("Photo captured successfully");
    }

    function retakePhoto() {
        photoDataUrl = null;
        capturedImage.src = '';

        capturedImage.style.display = 'none';
        cameraFeed.style.display = 'block';
        cameraOverlay.style.display = 'block';

        updateCaptureButtonState('capture');
        nextBtn.disabled = true;
    }

    function updateCaptureButtonState(state) {
        const btnIcon = captureBtn.querySelector('svg');
        const btnText = captureBtn.querySelector('span');

        if (state === 'retake') {
            captureBtn.classList.add('retake');
            btnText.textContent = 'Retake Photo';
            btnIcon.innerHTML = '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M21 21v-5h-5"/>';
            captureBtn.onclick = retakePhoto;
        } else {
            captureBtn.classList.remove('retake');
            btnText.textContent = 'Capture Photo';
            btnIcon.innerHTML = '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>';
            captureBtn.onclick = capturePhoto;
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }

    captureBtn.onclick = capturePhoto;

    nextBtn.onclick = () => {
        if (photoDataUrl) {
            console.log("Proceeding to Signature step with photo data.");
        }
    };

    startCamera();

    window.addEventListener('beforeunload', () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
    });
});