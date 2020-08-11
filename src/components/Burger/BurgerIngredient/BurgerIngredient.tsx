import React from 'react';
import classes from './BurgerIngredient.module.css';

type ingredientProps = {
  type: string;
};

const BurgerIngredient: React.FC<ingredientProps> = ({ type }) => {
  let ingredient: JSX.Element | null = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom} />;
      break;
    case 'bread-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={classes.Meat} />;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese} />;
      break;
    case 'lettuce':
      ingredient = <div className={classes.Lettuce} />;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon} />;
      break;
    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

export default BurgerIngredient;
