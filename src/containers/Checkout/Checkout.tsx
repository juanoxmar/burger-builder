import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect, ConnectedProps } from 'react-redux';
import { IngredientType } from '../../components/Burger/Burger';

type stateType = {
  order: {
    loading: boolean;
    purchased: boolean;
  };
  burger: {
    ingredients: IngredientType;
  };
};

const mapState = (state: stateType) => ({
  loading: state.order.loading,
  purchased: state.order.purchased,
  ings: state.burger.ingredients,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CheckoutProps = RouteComponentProps & PropsFromRedux;

function Checkout(props: CheckoutProps) {
  const { history, purchased, ings, match } = props;
  const cancelHandler = () => {
    history.goBack();
  };

  const continueHandler = () => {
    history.replace('/burger-builder/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ings}
          cancel={cancelHandler}
          continueCheck={continueHandler}
        />
        <Route path={`${match.url}/contact-data`} component={ContactData} />
      </div>
    );
  }
  return summary;
}

export default connector(Checkout);
