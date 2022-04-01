import * as actionTypes from './actionTypes';

// Aciont Creator
export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT
  }
}

export const add = value => {
  return {
    type: actionTypes.ADD,
    value
  }
}

export const substract = value => {
  return {
    type: actionTypes.SUBSTRACT,
    value
  }
}