import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHndler';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/spinner/Spinner'

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders()
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loadingReducer)
      orders = this.props.ordersReducer.map(order => (
        <Order key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordersReducer: state.order.orders,
    loadingReducer: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))