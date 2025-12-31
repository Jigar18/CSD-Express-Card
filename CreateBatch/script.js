document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Auto-fill Today's Date
    const dateField = document.getElementById('dateField');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US');
    dateField.value = formattedDate;

    // 2. Validation & Submission Logic
    const form = document.getElementById('createBatchForm');
    
    // Get Inputs by ID
    const batchInput = document.getElementById('batchInput');
    const txnInput = document.getElementById('txnInput'); // NEW
    const amountInput = document.getElementById('amountInput');
    const cardsInput = document.getElementById('cardsInput');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload

        // Reset previous errors
        batchInput.classList.remove('is-invalid');
        txnInput.classList.remove('is-invalid'); // NEW
        amountInput.classList.remove('is-invalid');
        cardsInput.classList.remove('is-invalid');

        let isValid = true;

        // --- RULE 1: Batch Number (B-YYYY-XXX) ---
        const batchRegex = /^B-\d{4}-\d{3}$/;
        if (!batchRegex.test(batchInput.value.trim())) {
            batchInput.classList.add('is-invalid');
            isValid = false;
        }

        // --- RULE 2: Transaction Ref (TXN-XXXXXX) ---
        // Starts with TXN-, followed by exactly 6 digits
        const txnRegex = /^TXN-\d{6}$/;
        if (!txnRegex.test(txnInput.value.trim())) {
            txnInput.classList.add('is-invalid');
            isValid = false;
        }

        // --- RULE 3: Amount > 0 ---
        const amountValue = parseFloat(amountInput.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            amountInput.classList.add('is-invalid');
            isValid = false;
        }

        // --- RULE 4: Cards > 0 ---
        const cardsValue = parseInt(cardsInput.value);
        if (isNaN(cardsValue) || cardsValue <= 0) {
            cardsInput.classList.add('is-invalid');
            isValid = false;
        }

        // --- FINAL CHECK ---
        if (isValid) {
            alert(`Success! Batch ${batchInput.value} has been created.`);
            window.location.href = '../Dashboard/index.html';
        }
    });

});