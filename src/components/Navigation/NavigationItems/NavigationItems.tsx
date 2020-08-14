import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/burger-builder'>Burger Builder</NavigationItem>
    <NavigationItem link='/burger-builder/orders'>Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
