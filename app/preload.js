
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchDataFromERPNext: async (url, headers) => {
        const response = await fetch(url, { method: 'GET', headers });
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
    },
});