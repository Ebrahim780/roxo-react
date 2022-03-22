import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './burgerIngredient/BurgerIngredient';

const Burger = (props) => {

  const transformedIngredients = Object.keys(props.ingredients).map(igKeys => {
    return [...Array(props.ingredients[igKeys])].map((_, index) => {
      return <BurgerIngredient key={igKeys + index} type={igKeys} />
    })
  });

  console.log(transformedIngredients)

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burger;