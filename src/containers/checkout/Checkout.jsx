import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './contactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {

  checkoutCancelled = () => {
    this.props.history.goBack()
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingsReducer}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingsReducer: state.ingredients
  }
}

export default connect(mapStateToProps)(CheckOut);