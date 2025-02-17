document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchDataBtn');
    const resourceTypeDropdown = document.getElementById('resourceType');
    const searchInput = document.getElementById('searchInput');
    const dataList = document.getElementById('dataList');
    const detailsDisplay = document.getElementById('detailsDisplay');
    const documentDetails = document.getElementById('documentDetails');
    const loading = document.getElementById('loading');

    let allData = [];

    fetchButton.addEventListener('click', async () => {
        const selectedResource = resourceTypeDropdown.value;
        const baseUrl = 'http://127.0.0.1:8000/api/resource/' + selectedResource;
        const headers = {
            Authorization: 'token 6111ce467bbefc7:55034a81ab53658',
        };

        allData = [];
        let limitStart = 0;
        const limitPageLength = 100;

        try {
            loading.classList.remove('hidden');
            dataList.innerHTML = '';

            while (true) {
                const url = `${baseUrl}?limit_start=${limitStart}&limit_page_length=${limitPageLength}`;
                const response = await window.electronAPI.fetchDataFromERPNext(url, headers);

                allData = allData.concat(response.data);

                if (response.data.length < limitPageLength) {
                    break;
                }

                limitStart += limitPageLength;
            }

            loading.classList.add('hidden');

            displayData(allData);

        } catch (error) {
            console.error('Error fetching data:', error);
            dataList.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    function displayData(data) {
        dataList.innerHTML = '';
        data.forEach((doc) => {
            const docItem = document.createElement('div');
            docItem.classList.add('doc-item');
            docItem.textContent = `${doc.name} | ${doc.customer || 'N/A'}`;
            docItem.addEventListener('click', () => {
                detailsDisplay.textContent = JSON.stringify(doc, null, 2);
                documentDetails.classList.remove('hidden');
            });
            dataList.appendChild(docItem);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = allData.filter((doc) => {
            return (
                doc.name.toLowerCase().includes(query) ||
                (doc.customer && doc.customer.toLowerCase().includes(query))
            );
        });
        displayData(filteredData);
    });

    // Export as CSV
    document.getElementById('exportCSV').addEventListener('click', () => {
        const csvRows = [];
        const headers = Object.keys(allData[0] || {});
        csvRows.push(headers.join(','));

        allData.forEach((doc) => {
            const values = headers.map((header) => `"${doc[header] || ''}"`);
            csvRows.push(values.join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
    });

    // Export as JSON
    document.getElementById('exportJSON').addEventListener('click', () => {
        const jsonData = JSON.stringify(allData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
    });
});