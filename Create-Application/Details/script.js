document.addEventListener('DOMContentLoaded', () => {
    
    // Validation Rules
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

    const form = document.getElementById('detailsForm');
    const inputs = form.querySelectorAll('input, select');

    // Add event listeners for real-time validation
    inputs.forEach(input => {
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Validate on input if the field already has an error
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // PAN Number Auto-Capitalize
    const panInput = document.getElementById('panNumber');
    if (panInput) {
        panInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }

    // Phone Number Limit to 10 digits
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value.length > 10) this.value = this.value.slice(0, 10);
        });
    }

    // Helper function to validate a single field
    function validateField(input) {
        const fieldId = input.id;
        const value = input.value;
        const rule = validators[fieldId];
        const formGroup = input.closest('.form-group');

        if (!rule) return true; // No rule for this field

        const isValid = rule(value);

        if (isValid) {
            formGroup.classList.remove('error');
            return true;
        } else {
            formGroup.classList.add('error');
            return false;
        }
    }

    // Global function attached to window for the button onclick
    window.validateAndProceed = function() {
        let isFormValid = true;
        let firstErrorField = null;

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
            // Redirect to the Photo page
            window.location.href = '../Photo/index.html'; 
        } else {
            // Scroll to the first error
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    };
});