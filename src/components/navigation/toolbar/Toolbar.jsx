import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../logo/Logo'
import NavigationItems from './navigationItems/NavigationItems';

const Toolbar = () => {
  return (
    <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  )
}

export default Toolbar;