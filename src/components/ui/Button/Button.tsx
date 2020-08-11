import React from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  clicked: () => void;
  btnType: string;
};

const Button: React.FC<ButtonProps> = ({ children, btnType, clicked }) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
  >
    {children}
  </button>
);

export default Button;
