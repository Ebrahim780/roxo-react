import React from 'react';
import Logo from '../../logo/Logo';
import NavigationItems from '../toolbar/navigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/backDrop/BackDrop';
import Aux from '../../../hoc/Auxx/Auxx';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.open)
    attachedClasses = [classes.SideDrawer, classes.Open]

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer;