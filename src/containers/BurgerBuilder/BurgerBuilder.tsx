import React, { useState, useEffect } from 'react';
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

export function BurgerBuilder(props: BurgerBuilderProps) {
  const {
    history,
    isAuth,
    prc,
    ing,
    initHandler,
    err,
    addHandler,
    delHandler,
  } = props;
  const [purchaseable, setPurchaseable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(!purchasing);
    } else {
      history.push('/burger-builder/auth');
    }
  };

  const purchaseContineHandler = () => {
    history.push({
      pathname: '/burger-builder/checkout',
    });
  };

  useEffect(() => {
    if (prc <= 8) {
      initHandler();
    }

    if (prc > 8 && !purchaseable) {
      setPurchaseable(true);
    }
  }, [initHandler, setPurchaseable, prc, purchaseable]);

  useEffect(() => {
    if (prc > 8 && !purchaseable) {
      setPurchaseable(true);
    } else if (prc === 8 && purchaseable) {
      setPurchaseable(false);
    }
  }, [prc, purchaseable]);

  const disableInfo: IngredientType = {
    ...ing,
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

  let burger = err !== null ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ing) {
    orderSummary = (
      <OrderSummary
        ingredients={ing}
        purchaseCancel={purchaseHandler}
        purchaseContinue={purchaseContineHandler}
        price={prc}
      />
    );
    burger = (
      <React.Fragment>
        <Burger ingredients={ing} />
        <BuildControls
          ingredientAdded={addHandler}
          ingredientRemoved={delHandler}
          disabled={disableButton}
          price={prc}
          purchaseable={purchaseable}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
}

export default connector(withErrorHandler(BurgerBuilder, axios));
