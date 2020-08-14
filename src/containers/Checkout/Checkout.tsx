import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { RouteComponentProps, Route } from 'react-router-dom';
import { IngredientType, ig } from '../../components/Burger/Burger';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component<RouteComponentProps> {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    const query: any = new URLSearchParams(this.props.location.search);

    const ingredients: IngredientType = {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    };

    let price = 0;
    for (let param of query.entries() as [ig | 'price', number][]) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

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
          ingredients={this.state.ingredients}
          cancel={this.cancelHandler}
          continueCheck={this.continueHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
