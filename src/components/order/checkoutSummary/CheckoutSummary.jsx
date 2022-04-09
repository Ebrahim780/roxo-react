import React from 'react';
import Burger from '../../burger/Burger';
import Button from '../../UI/button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={classes.IngredientsContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <h4><strong>Continue To Order?</strong></h4>
      <Button btnType='Danger' clicked={props.checkoutCancelled}>Cancel</Button>
      <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
    </div>
  )
}

export default CheckoutSummary;