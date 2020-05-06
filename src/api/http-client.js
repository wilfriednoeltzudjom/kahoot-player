import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export default httpClient;
