const axios = require('axios');
const http = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).token : null}`
    }
})
export default http;