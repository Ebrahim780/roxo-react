import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/actions';

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
                <button onClick={() => this.props.StoreResult(this.props.counter)}>Store Result</button>
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
        incrementCounter: () => dispatch(actionCreators.increment()),
        decrementCounter: () => dispatch(actionCreators.decrement()),
        addFive: () => dispatch(actionCreators.add(10)),
        substractFive: () => dispatch(actionCreators.substract(15)),
        StoreResult: result => dispatch(actionCreators.storeResult(result)),
        DeleteResult: id => dispatch(actionCreators.deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);