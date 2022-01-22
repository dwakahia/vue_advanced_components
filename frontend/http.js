const axios = require('axios');
const http = axios.create({
    baseURL: 'https://vueadvancedcomponents.herokuapp.com/api/v1',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).token : null}`
    }
})
export default http;