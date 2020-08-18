import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Burger, { IngredientType, ig } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect, ConnectedProps } from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandling';
import axios from '../../axios-orders';
import * as actionCreator from '../../store/actions/index';

type BurgerState = {
  purchaseable: boolean;
  purchasing: boolean;
};

type stateType = {
  burger: {
    ingredients: {
      lettuce: number;
      bacon: number;
      cheese: number;
      meat: number;
    };
    price: number;
    error: boolean;
  };
  auth: { token: string };
};

export const mapState = (state: stateType) => ({
  ing: {
    lettuce: state.burger.ingredients.lettuce,
    bacon: state.burger.ingredients.bacon,
    cheese: state.burger.ingredients.cheese,
    meat: state.burger.ingredients.meat,
  },
  prc: state.burger.price,
  err: state.burger.error,
  isAuth: state.auth.token !== '',
});

const mapDispatch = {
  addHandler: (key: string) => actionCreator.addIngredient(key),
  delHandler: (key: string) => actionCreator.remIngredient(key),
  initHandler: () => actionCreator.initIngredients(),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type BurgerBuilderProps = PropsFromRedux & RouteComponentProps;

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerState> {
  state = {
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients: IngredientType) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key as ig])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: !this.state.purchasing });
    } else {
      this.props.history.push('/burger-builder/auth');
    }
  };

  purchaseContineHandler = () => {
    this.props.history.push({
      pathname: '/burger-builder/checkout',
    });
  };

  componentDidMount() {
    if (this.props.prc <= 8) {
      this.props.initHandler();
    }

    if (this.props.prc > 8 && !this.state.purchaseable) {
      this.setState({
        purchaseable: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.prc > 8 && !this.state.purchaseable) {
      this.setState({
        purchaseable: true,
      });
    } else if (this.props.prc === 8 && this.state.purchaseable) {
      this.setState({
        purchaseable: false,
      });
    }
  }

  render() {
    const disableInfo: IngredientType = {
      ...this.props.ing,
    };

    const disableButton = {
      lettuce: false,
      bacon: false,
      cheese: false,
      meat: false,
    };

    let key: ig;
    for (key in disableInfo) {
      disableButton[key] = disableInfo[key] <= 0 ? true : false;
    }

    let orderSummary;

    let burger =
      this.props.err !== null ? (
        <p>Ingredients can't be loaded!</p>
      ) : (
        <Spinner />
      );

    if (this.props.ing) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          purchaseCancel={this.purchaseHandler}
          purchaseContinue={this.purchaseContineHandler}
          price={this.props.prc}
        />
      );
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.addHandler}
            ingredientRemoved={this.props.delHandler}
            disabled={disableButton}
            price={this.props.prc}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          />
        </React.Fragment>
      );
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

export default connector(withErrorHandler(BurgerBuilder, axios));
