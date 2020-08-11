import React from 'react';
import classes from './Backdrop.module.css';

type BackdropProps = {
  show: boolean;
  clicked: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked}></div> : null;

export default Backdrop;
