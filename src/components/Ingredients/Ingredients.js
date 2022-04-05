import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    console.log(ingredients)
  }, [ingredients])

  const addIngredientHandler = ingredient => {
    fetch('https://ingredients-5-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(Response => {
        return Response.json()
      })
      .then(ResponseData => {
        setIngredients(prevIngredients => [
          ...prevIngredients,
          { id: ResponseData.name, ...ingredient }
        ])
      })
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList ingredients={ingredients}
          removeItem={() => { }} />
      </section>
    </div>
  )
}

export default Ingredients;
