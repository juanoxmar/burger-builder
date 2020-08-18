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

class Checkout extends React.Component<CheckoutProps> {
  cancelHandler = () => {
    this.props.history.goBack();
  };

  continueHandler = () => {
    this.props.history.replace('/burger-builder/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            cancel={this.cancelHandler}
            continueCheck={this.continueHandler}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

export default connector(Checkout);
