import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/kafka-ui',
  timeout: 10000,
});

const headers = { headers: {'Content-Type': 'application/json'} };

export const getData = async () => {
  try {
    const response = await apiClient.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const testConnection = (serverAddress) => apiClient.post('/test-connection', {serverAddress: serverAddress}, headers);
