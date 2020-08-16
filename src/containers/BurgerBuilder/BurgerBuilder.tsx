import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Burger, { IngredientType, ig } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ADD_INGREDIENT, REM_INGREDIENT } from '../../store/actions';
import { connect, ConnectedProps } from 'react-redux';

type BurgerState = {
  purchaseable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
};

type stateType = {
  ingredients: {
    lettuce: number;
    bacon: number;
    cheese: number;
    meat: number;
  };
  price: number;
};

export const mapState = (state: stateType) => ({
  ing: {
    lettuce: state.ingredients.lettuce,
    bacon: state.ingredients.bacon,
    cheese: state.ingredients.cheese,
    meat: state.ingredients.meat,
  },
  prc: state.price,
});

const mapDispatch = {
  addHandler: (key: string) => ({
    type: ADD_INGREDIENT,
    key: key,
  }),
  delHandler: (key: string) => ({
    type: REM_INGREDIENT,
    key: key,
  }),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;
type BurgerBuilderProps = PropsFromRedux & RouteComponentProps;

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerState> {
  state = {
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

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  purchaseContineHandler = () => {
    this.props.history.push({
      pathname: '/burger-builder/checkout',
    });
  };

  componentDidMount() {
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

    for (let key in disableInfo) {
      disableButton[key as ig] = disableInfo[key as ig] <= 0 ? true : false;
    }

    let orderSummary;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.prc) {
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

export default connector(BurgerBuilder);
