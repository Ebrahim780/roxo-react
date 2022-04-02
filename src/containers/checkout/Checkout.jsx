import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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

    let summary = <Redirect to='/' />;

    if (this.props.ingsReducer) {
      const purchasedRedirect = this.props.purchasedReducer ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
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

    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingsReducer: state.burgerBuilder.ingredients,
    purchasedReducer: state.order.purchased
  }
}

export default connect(mapStateToProps)(CheckOut);