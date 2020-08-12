import React from 'react';
import { IngredientType, ig } from '../Burger';
import Button from '../../UI/Button/Button';

type OrderSummaryProps = {
  ingredients: IngredientType;
  purchaseCancel: () => void;
  purchaseContinue: () => void;
  price: number;
};

// This could be a React.FC
class OrderSummary extends React.Component<OrderSummaryProps> {
  // componentDidUpdate() {
  //   console.log('[OrderSummary] DidUpdate');
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((key) => (
      <li key={key}>
        {key}: {this.props.ingredients[key as ig]}
      </li>
    ));
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>Delicious Burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue Checkout?</p>
        <Button clicked={this.props.purchaseCancel} btnType={'Danger'}>
          CANCEL
        </Button>
        <Button clicked={this.props.purchaseContinue} btnType={'Success'}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
