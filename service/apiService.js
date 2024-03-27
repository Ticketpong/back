// service.js
const axios = require('axios');
const apiUrl = "https://api.example.com/concerts"

class ApiService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData() {
        try {
            const response = await axios.get(this.apiUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching data from API:', error);
            throw error;
        }
    }
}

module.exports = ApiService;
