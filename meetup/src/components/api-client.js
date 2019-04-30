import client from 'axios';

const instance = client.create({
  baseURL: 'http://localhost:8080/',
});

export default instance;
