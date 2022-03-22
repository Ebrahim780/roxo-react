import React from 'react';
import BurgerBuilder from '../components/burgerBuilder/BurgerBuilder.jsx';
import Layout from '../components/layout/Layout.jsx'

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