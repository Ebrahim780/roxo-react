import React, { Component } from 'react';
import Aux from '../../hoc/Auxx/Auxx';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import Spinner from '../../components/UI/spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHndler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing })
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ebrahim',
        address: {
          street: 'teststreet 1',
          zipCode: '91725643314',
          country: 'Afg'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => { this.setState({ loading: false, purchasing: false }) })
      .catch(error => { this.setState({ loading: false, purchasing: false }) })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)

    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients)
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredient can't be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger =
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        continue={this.purchaseContinueHandler}
        cancel={this.purchaseHandler} />
    }

    if (this.state.loading)
      orderSummary = <Spinner />

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

export default WithErrorHandler(BurgerBuilder, axios);