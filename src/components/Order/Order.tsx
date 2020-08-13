import React from 'react';
import classes from './Order.module.css';
import { IngredientType, ig } from '../Burger/Burger';

type OrderProps = {
  ingredients: IngredientType;
  totalPrice: number;
};

const Order: React.FC<OrderProps> = ({ ingredients, totalPrice }) => {
  const ingAll = [];
  for (let ing in ingredients) {
    ingAll.push({
      name: ing,
      amount: ingredients[ing as ig],
    });
  }
  const ingOut = ingAll.map(({ name, amount }) => (
    <span
      key={name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #eee',
        padding: '5px',
      }}
    >
      {name} ({amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOut}</p>
      <p>Price: {totalPrice}</p>
    </div>
  );
};

export default Order;
