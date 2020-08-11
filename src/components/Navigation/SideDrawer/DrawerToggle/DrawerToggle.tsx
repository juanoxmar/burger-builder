import React from 'react';
import classes from './DrawerToggle.module.css';

type DrawerToggleProps = {
  click: () => void;
};

const DrawerToggle: React.FC<DrawerToggleProps> = ({ click }) => {
  return (
    <div onClick={click} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
