import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {

    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.incrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.decrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.addFive} />
                <CounterControl label="Subtract 15" clicked={this.props.substractFive} />
                <hr />
                <button onClick={this.props.StoreResult}>Store Result</button>
                <ul>
                    {this.props.results.map(result => (
                        <li key={result.id}
                            onClick={() => this.props.DeleteResult(result.id)}>
                            {result.value}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counter,
        results: state.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementCounter: () => dispatch({ type: 'INCREMENT' }),
        decrementCounter: () => dispatch({ type: 'DECREMENT' }),
        addFive: () => dispatch({ type: 'ADD', value: 10 }),
        substractFive: () => dispatch({ type: 'SUBSTRACT', value: 15 }),
        StoreResult: () => dispatch({ type: 'STORE_RESULT' }),
        DeleteResult: id => dispatch({ type: 'DELETE_RESULT', id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);