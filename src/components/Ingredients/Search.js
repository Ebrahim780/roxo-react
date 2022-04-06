import React, { useEffect, useState, useRef } from 'react';

import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/useHttp';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [filter, setFilter] = useState('')
  const { onLoadIngredients } = props;
  const inputRef = useRef()
  const {
    loading,
    data,
    error,
    sendRequest,
    clear
  } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query = filter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${filter}"`;
        sendRequest(
          'https://ingredients-5-default-rtdb.firebaseio.com/ingredients.json' + query,
          'GET'
        )
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
    }

  }, [filter, inputRef, onLoadIngredients])

  useEffect(() => {
    if (!loading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        })
      }
      onLoadIngredients(loadedIngredients)
    }
  }, [data, loading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input type="text" value={filter} ref={inputRef}
            onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  )
})

export default Search;