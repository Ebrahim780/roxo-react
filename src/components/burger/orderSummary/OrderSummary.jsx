import React from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import Button from '../../UI/button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{props.ingredients[igKey]}
      </li>)
  })

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue To Checkout?</p>
      <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
      <Button btnType='Success' clicked={props.continue}>Continue</Button>
    </Aux>
  )
}

export default OrderSummary;