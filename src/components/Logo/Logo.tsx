import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo: React.FC<{ height?: string }> = ({ height }) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt='Burger Builder' style={{ height: height }} />
  </div>
);

export default Logo;
