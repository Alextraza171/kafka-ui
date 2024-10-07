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

export const createTopic = (createTopicRequest) => apiClient.post('/topic', createTopicRequest, headers);

export const getTopics = (serverAddress) => apiClient.get(`/topic?serverAddress=${serverAddress}`);

export const connectToTopic = (connectRequest) => apiClient.post('/connect', connectRequest, headers);

export const sendMessage = (sendRequest) => apiClient.post('/send', sendRequest, headers);

export const getActiveConnections = () => apiClient.get('/active-connections');
