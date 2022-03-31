import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {

    componentDidUpdate() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.incrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.decrementCounter} />
                <CounterControl label="Add 10" clicked={this.props.addFive} />
                <CounterControl label="Subtract 15" clicked={this.props.substractFive} />
                <hr />
                <button onClick={() =>this.props.StoreResult(this.props.counter)}>Store Result</button>
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
        counter: state.counterState.counter,
        results: state.resultsState.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        incrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        decrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        addFive: () => dispatch({ type: actionTypes.ADD, value: 10 }),
        substractFive: () => dispatch({ type: actionTypes.SUBSTRACT, value: 15 }),
        StoreResult: result => dispatch({ type: actionTypes.STORE_RESULT, result }),
        DeleteResult: id => dispatch({ type: actionTypes.DELETE_RESULT, id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);