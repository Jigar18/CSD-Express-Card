document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('camera-feed');
    const canvas = document.createElement('canvas'); // Hidden canvas for capture
    const captureBtn = document.querySelector('.capture-action-btn');
    const btnText = captureBtn.querySelector('span');
    const capturedImage = document.getElementById('captured-image');
    
    let isStreamRunning = false;
    let streamReference = null;

    // 1. Start Camera
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480, facingMode: "user" } 
            });
            video.srcObject = stream;
            video.play();
            streamReference = stream;
            isStreamRunning = true;
            
            // Show video, hide captured image
            video.style.display = 'block';
            capturedImage.style.display = 'none';
            
            // Reset Button
            captureBtn.classList.remove('retake');
            captureBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                <span>Capture Photo</span>
            `;
            
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Could not access camera. Please allow permissions.");
        }
    }

    // 2. Capture / Retake Logic
    captureBtn.addEventListener('click', () => {
        if (isStreamRunning) {
            // --- CAPTURE MODE ---
            
            // Draw video frame to canvas
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to image URL
            const imageData = canvas.toDataURL('image/png');
            capturedImage.src = imageData;
            
            // UI Switch
            video.style.display = 'none';
            capturedImage.style.display = 'block';
            
            // Stop Stream
            streamReference.getTracks().forEach(track => track.stop());
            isStreamRunning = false;
            
            // Change Button to "Retake"
            captureBtn.classList.add('retake');
            captureBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                <span>Retake Photo</span>
            `;
            
            showToast("Photo captured successfully!");

            // Optional: Next Step Logic (Simulated)
            setTimeout(() => {
               // You can enable a "Next Step" button here if you add one later
            }, 1000);

        } else {
            // --- RETAKE MODE ---
            startCamera();
        }
    });

    // 3. Show Toast Notification
    function showToast(message) {
        const container = document.querySelector('.toast-container') || createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <div class="toast-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        container.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function createToastContainer() {
        const div = document.createElement('div');
        div.className = 'toast-container';
        document.body.appendChild(div);
        return div;
    }

    // Initialize
    startCamera();
});