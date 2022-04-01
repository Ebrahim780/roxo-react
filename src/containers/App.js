import React from 'react';
import BurgerBuilder from './burgerBuilder/BurgerBuilder.jsx';
import Layout from '../hoc/layout/Layout.jsx'
import CheckOut from './checkout/Checkout.jsx';
import Orders from './orders/Orders.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/checkout' component={CheckOut} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App;