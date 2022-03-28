import React from 'react';
import BurgerBuilder from './burgerBuilder/BurgerBuilder.jsx';
import Layout from '../hoc/layout/Layout.jsx'

const App = () => {
  return (
    <>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </>
  )
}

export default App;