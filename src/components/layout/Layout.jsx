import React from 'react';
import Aux from '../../hoc/Auxx';
import Toolbar from '../navigation/toolbar/Toolbar';
import classes from './Layout.module.css';

const Layout = (porps) => {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.Content}>
        {porps.children}
      </main>
    </Aux>
  )
}

export default Layout;