import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger, { IngredientType } from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

type CheckoutSummaryProps = {
  ingredients: IngredientType;
  cancel: () => void;
  continueCheck: () => void;
};

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  ingredients,
  cancel,
  continueCheck,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType='Danger' clicked={cancel}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={continueCheck}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
