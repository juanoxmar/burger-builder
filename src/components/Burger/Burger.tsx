import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

type BurgerProps = {
  ingredients: IngredientType;
};

export type IngredientType = {
  lettuce: number;
  bacon: number;
  cheese: number;
  meat: number;
};

export type ig = keyof IngredientType;

const Burger: React.FC<BurgerProps> = ({ ingredients }) => {
  let transformedIngredients: JSX.Element[] | JSX.Element = (Object.keys(
    ingredients
  ) as ig[])
    .map((key: ig) => {
      return [...Array(ingredients[key])].map((_, i) => (
        <BurgerIngredient key={key + i} type={key} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
