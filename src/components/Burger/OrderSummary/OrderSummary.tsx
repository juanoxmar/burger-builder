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
function OrderSummary(props: OrderSummaryProps) {
  const { ingredients, price, purchaseCancel, purchaseContinue } = props;

  const ingredientSummary = Object.keys(ingredients).map((key) => (
    <li key={key}>
      {key}: {ingredients[key as ig]}
    </li>
  ));

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Delicious Burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${price.toFixed(2)}</strong>
      </p>
      <p>Continue Checkout?</p>
      <Button clicked={purchaseCancel} btnType={'Danger'}>
        CANCEL
      </Button>
      <Button clicked={purchaseContinue} btnType={'Success'}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
}

export default OrderSummary;
