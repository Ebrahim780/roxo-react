import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredient;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not get there!')
  }
}

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currentHttpState, error: null }
    default:
      throw new Error('Should not be reached!')
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  })

  useEffect(() => {
    console.log(httpState)
  }, [ingredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredient: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({ type: 'SEND' })
    fetch('https://ingredients-5-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' })
        return response.json()
      })
      .then(responseData => {
        dispatch({
          type: 'ADD', ingredient: { id: responseData.name, ...ingredient }
        })
      })
  }

  const removeIngredientHandler = id => {
    dispatchHttp({ type: 'SEND' })
    fetch(`https://ingredients-5-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' })
        dispatch({
          type: 'DELETE', id
        })
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Somting went wrong!' })
      })
  }

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' })
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm loading={httpState.loading}
        addIngredient={addIngredientHandler} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients}
          removeItem={removeIngredientHandler} />
      </section>
    </div>
  )
}

export default Ingredients;
