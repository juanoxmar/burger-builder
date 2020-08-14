import React from 'react';
import classes from './Input.module.css';

type InputProps = {
  label?: string;
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ label, type, placeholder }) => (
  <div className={classes.Input}>
    <label className={classes.Label}>{label}</label>
    <input
      type={type}
      className={classes.InputElement}
      placeholder={placeholder}
    />
  </div>
);

export default Input;
