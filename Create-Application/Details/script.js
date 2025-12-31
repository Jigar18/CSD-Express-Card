document.addEventListener('DOMContentLoaded', () => {
    // 1. CONFIGURATION: Define Rules for each field ID
    const validators = {
        applicantName: (val) => val.trim() !== '',
        dob:           (val) => val.trim() !== '',
        panNumber:     (val) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val),
        email:         (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        phone:         (val) => /^\d{10}$/.test(val),
        fatherName:    (val) => val.trim() !== '',
        cardedNumber:  (val) => val.trim() !== '',
        maritalStatus: (val) => val !== ''
    };

    // 2. SETUP: Attach Event Listeners for "Real-time" Validation
    const form = document.getElementById('detailsForm');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        // Event A: Blur (When user leaves the field) -> Validate immediately
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Event B: Input (As user types) -> Clear error ONLY if it was previously invalid
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Special Handling: Auto-uppercase PAN
    const panInput = document.getElementById('panNumber');
    if (panInput) {
        panInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }

    // Special Handling: Phone Length limit
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value.length > 10) this.value = this.value.slice(0, 10);
        });
    }

    // 3. CORE: The actual validation logic
    function validateField(input) {
        const fieldId = input.id;
        const value = input.value;
        const rule = validators[fieldId];
        const formGroup = input.closest('.form-group');

        // If no rule exists for this field, ignore it
        if (!rule) return true;

        const isValid = rule(value);

        if (isValid) {
            formGroup.classList.remove('error');
            return true;
        } else {
            formGroup.classList.add('error');
            return false;
        }
    }

    // 4. BUTTON ACTION: "Next" Button Handler
    // This is attached to the window object so your HTML onclick="validateAndProceed()" can find it
    window.validateAndProceed = function() {
        let isFormValid = true;
        let firstErrorField = null;

        // Check ALL fields defined in our validators object
        for (const fieldId in validators) {
            const input = document.getElementById(fieldId);
            if (input) {
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                    if (!firstErrorField) firstErrorField = input;
                }
            }
        }

        if (isFormValid) {
            console.log("Validation passed.");
            alert("Success! Proceeding to Photo Capture...");
            // window.location.href = 'application-photo.html';
        } else {
            // Scroll to the first error so user sees it
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    };
});