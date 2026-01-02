document.addEventListener('DOMContentLoaded', function() {
    
    
    const dateField = document.getElementById('dateField');
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US');
    dateField.value = formattedDate;

   
    const form = document.getElementById('createBatchForm');
    
 
    const batchInput = document.getElementById('batchInput');
    const txnInput = document.getElementById('txnInput'); 
    const amountInput = document.getElementById('amountInput');
    const cardsInput = document.getElementById('cardsInput');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        
        batchInput.classList.remove('is-invalid');
        txnInput.classList.remove('is-invalid'); 
        amountInput.classList.remove('is-invalid');
        cardsInput.classList.remove('is-invalid');

        let isValid = true;

       
        const batchRegex = /^B-\d{4}-\d{3}$/;
        if (!batchRegex.test(batchInput.value.trim())) {
            batchInput.classList.add('is-invalid');
            isValid = false;
        }

        
        const txnRegex = /^TXN-\d{6}$/;
        if (!txnRegex.test(txnInput.value.trim())) {
            txnInput.classList.add('is-invalid');
            isValid = false;
        }

        
        const amountValue = parseFloat(amountInput.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            amountInput.classList.add('is-invalid');
            isValid = false;
        }

        
        const cardsValue = parseInt(cardsInput.value);
        if (isNaN(cardsValue) || cardsValue <= 0) {
            cardsInput.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            alert(`Success! Batch ${batchInput.value} has been created.`);
            window.location.href = '../Dashboard/index.html';
        }
    });

});