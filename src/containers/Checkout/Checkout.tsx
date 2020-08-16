import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect, ConnectedProps } from 'react-redux';
import { mapState } from '../BurgerBuilder/BurgerBuilder';

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
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ing}
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
}

export default connector(Checkout);
