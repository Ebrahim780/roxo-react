import React from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.module.css';

const Layout = (porps) => {
  return (
    <Aux>
      <div>
        Toolbar, side drawer, backdrop
      </div>
      <main className={classes.Content}>
        {porps.children}
      </main>
    </Aux>
  )
}

export default Layout;