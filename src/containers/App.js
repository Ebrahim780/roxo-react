import React from 'react';
import Blog from './blog/Blog';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Blog />
    </BrowserRouter>
  )
}

export default App;