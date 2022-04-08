import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-9da9a-default-rtdb.firebaseio.com/'
})

export default instance;