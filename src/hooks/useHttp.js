import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null
}

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier
      }

    case 'RESPONSE':
      return {
        ...currentHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra
      }

    case 'ERROR':
      return { loading: false, error: action.errorMessage }

    case 'CLEAR':
      return initialState

    default:
      throw new Error('Should not be reached!')
  }
}

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState)

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(
    (url, method, body, reqExtra, reqIdentifer) => {
      dispatchHttp({ type: 'SEND', identifier: reqIdentifer })

      fetch(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(responseData => {
          dispatchHttp({
            type: 'RESPONSE',
            responseData,
            extra: reqExtra
          })
        })
        .catch(error => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: 'Somting went wrong!'
          })
        })
    }, []
  )

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    sendRequest,
    clear
  }
}

export default useHttp;