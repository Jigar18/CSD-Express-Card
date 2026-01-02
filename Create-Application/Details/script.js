document.addEventListener('DOMContentLoaded', () => {
    
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

    inputs.forEach(input => {
    
        input.addEventListener('blur', () => {
            validateField(input);
        });

    
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(input);
            }
        });
    });

        const panInput = document.getElementById('panNumber');
    if (panInput) {
        panInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }

        const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value.length > 10) this.value = this.value.slice(0, 10);
        });
    }

        function validateField(input) {
        const fieldId = input.id;
        const value = input.value;
        const rule = validators[fieldId];
        const formGroup = input.closest('.form-group');

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
            alert("Success! Proceeding to Photo Capture...");
            // window.location.href = 'application-photo.html';
        } else {
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    };
});