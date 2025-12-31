document.addEventListener('DOMContentLoaded', function() {
    
    
    const batches = [];
    const statuses = ['Completed', 'Processing', 'Pending'];
    const locations = ['HQ Delhi', 'Pune Cantt', 'Chandigarh', 'Lucknow', 'Jaipur'];

    for (let i = 1; i <= 50; i++) {
        
        const num = i.toString().padStart(3, '0');
        
        batches.push({
            id: `B-2023-${num}`,
            location: locations[Math.floor(Math.random() * locations.length)], 
            date: `2023-10-${(i % 30) + 1}`, 
            cards: Math.floor(Math.random() * 200) + 10, 
            status: statuses[Math.floor(Math.random() * statuses.length)] 
        });
    }

    
    let currentPage = 1;
    const rowsPerPage = 10;
    
    const tableBody = document.getElementById('tableBody');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');

    
    function renderTable() {
        
        tableBody.innerHTML = '';

        
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        
        
        const pageData = batches.slice(startIndex, endIndex);

       
        pageData.forEach(batch => {
            const row = document.createElement('tr');
            
            
            let badgeClass = '';
            if (batch.status === 'Completed') badgeClass = 'status-completed';
            else if (batch.status === 'Processing') badgeClass = 'status-processing';
            else badgeClass = 'status-pending';

            row.innerHTML = `
                <td style="font-weight: 500;">${batch.id}</td>
                <td>${batch.location}</td>
                <td>${batch.date}</td>
                <td>${batch.cards}</td>
                <td><span class="status-badge ${badgeClass}">${batch.status}</span></td>
                <td>
                    <div class="table-actions">
                         <span class="action-icon" title="View">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                         </span>
                         <span class="action-icon" title="Download">
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                         </span>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });

        
        const totalPages = Math.ceil(batches.length / rowsPerPage);
        pageIndicator.innerText = `Page ${currentPage} of ${totalPages}`;
        
        
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    }

    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(batches.length / rowsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    
    renderTable();
});