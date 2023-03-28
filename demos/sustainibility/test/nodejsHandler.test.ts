import axios from 'axios';
// import * as XLSX from 'xlsx/xlsx.mjs';
// import * as fs from 'fs';
// XLSX.set_fs(fs);

describe('xlsx', () => {
    it('should create an excel', async () => {
        const { data } = await axios.get('https://api.openbrewerydb.org/breweries', {
            headers: {
            'Content-Type': 'application/json',
            },
        });

        // const worksheet = XLSX.utils.json_to_sheet(data);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "nodejs-output");

    })
})