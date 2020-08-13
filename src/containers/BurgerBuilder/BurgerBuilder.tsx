import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Burger, { IngredientType, ig } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandling';

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 1.0,
  cheese: 0.75,
  meat: 1.5,
};

type BurgerBuildState = {
  ingredients: IngredientType | null;
  totalPrice: number;
  purchaseable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
};

class BurgerBuilder extends React.Component<
  RouteComponentProps,
  BurgerBuildState
> {
  state = {
    ingredients: null,
    totalPrice: 8.0,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseState = (ingredients: IngredientType) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key as ig])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  addIngredient = (type: ig) => {
    const oldCount = this.state.ingredients![type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...((this.state.ingredients as unknown) as IngredientType),
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredient = (type: ig) => {
    const oldCount = this.state.ingredients![type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...((this.state.ingredients as unknown) as IngredientType),
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  purchaseContineHandler = () => {
    const queryParams = [];
    for (let i in (this.state.ingredients as unknown) as IngredientType) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients![i]
        )}`
      );
    }

    queryParams.push(`price=${this.state.totalPrice.toFixed(2)}`);

    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/ingredients.json');
      this.setState({
        ingredients: {
          lettuce: response.data.lettuce,
          bacon: response.data.bacon,
          cheese: response.data.cheese,
          meat: response.data.meat,
        },
      });
    } catch (error) {
      this.setState({ error: true });
      console.error(error);
    }
  }

  render() {
    const disableInfo: IngredientType = {
      ...((this.state.ingredients as unknown) as IngredientType),
    };

    const disableButton = {
      lettuce: false,
      bacon: false,
      cheese: false,
      meat: false,
    };

    for (let key in disableInfo) {
      disableButton[key as ig] = disableInfo[key as ig] <= 0 ? true : false;
    }

    let orderSummary;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={(this.state.ingredients as unknown) as IngredientType}
          purchaseCancel={this.purchaseHandler}
          purchaseContinue={this.purchaseContineHandler}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <React.Fragment>
          <Burger
            ingredients={(this.state.ingredients as unknown) as IngredientType}
          />
          <BuildControls
            ingredientAdded={this.addIngredient}
            ingredientRemoved={this.removeIngredient}
            disabled={disableButton}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
