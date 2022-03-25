import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

axios.interceptors.request.use(request => {
  console.log(request)
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(Response => {
  console.log(Response)
  return Response
}, error => {
  console.log(error)
  return Promise.reject(error)
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
