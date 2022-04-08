import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import Spinner from '../../components/UI/spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHndler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  render() {
    const disabledInfo = {
      ...this.props.ingsReducer
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.props.errorReducer ? <p>Ingredient can't be loaded!</p> : <Spinner />

    if (this.props.ingsReducer) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingsReducer} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingsReducer)}
            ordered={this.purchaseHandler}
            price={this.props.priceReducer} />
        </Aux>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ingsReducer}
        price={this.props.priceReducer}
        continue={this.purchaseContinueHandler}
        cancel={this.purchaseHandler} />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingsReducer: state.burgerBuilder.ingredients,
    priceReducer: state.burgerBuilder.totalPrice,
    errorReducer: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder))