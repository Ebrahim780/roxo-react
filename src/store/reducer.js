import { v4 as uuid } from 'uuid';

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  console.log(state)
  const updatedArray = state.results.filter(result => result.id !== action.id);

  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1
      }

    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1
      }

    case 'ADD':
      return {
        ...state,
        counter: state.counter + action.value
      }

    case 'SUBSTRACT':
      return {
        ...state,
        counter: state.counter - action.value
      }
    case 'STORE_RESULT':
      return {
        ...state,
        results: state.results.concat({ id: uuid(), value: state.counter })
      }
    case 'DELETE_RESULT':
      return {
        ...state,
        results: updatedArray
      }

    default: return state

  }
}

export default reducer;