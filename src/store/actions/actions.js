export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBSTRACT = 'SUBSTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';


// Action Creator
export const increment = () => {
  return {
    type: INCREMENT
  }
}

export const decrement = () => {
  return {
    type: DECREMENT
  }
}

export const add = value => {
  return {
    type: ADD,
    value
  }
}

export const substract = value => {
  return {
    type: SUBSTRACT,
    value
  }
}

export const storeResult = result => {
  return {
    type: STORE_RESULT,
    result
  }
}

export const deleteResult = id => {
  return {
    type: DELETE_RESULT,
    id
  }
}