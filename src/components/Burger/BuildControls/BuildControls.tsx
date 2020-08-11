import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';
import { ig } from '../Burger';

export type DisableType = {
  salad: boolean;
  bacon: boolean;
  cheese: boolean;
  meat: boolean;
};

type BuildControlsProps = {
  ingredientAdded: (type: ig) => void;
  ingredientRemoved: (type: ig) => void;
  disabled: DisableType;
  price: number;
  purchaseable: boolean;
};

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls: React.FC<BuildControlsProps> = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchaseable,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => ingredientAdded(control.type as ig)}
          removed={() => ingredientRemoved(control.type as ig)}
          disabled={disabled[control.type as ig]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!purchaseable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
