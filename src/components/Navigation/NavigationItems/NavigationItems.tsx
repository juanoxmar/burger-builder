import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

type NavItemProps = {
  isAuthenticated: boolean;
};

const NavigationItems = ({ isAuthenticated }: NavItemProps) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/burger-builder'>Burger Builder</NavigationItem>
    {isAuthenticated ? (
      <NavigationItem link='/burger-builder/orders'>Orders</NavigationItem>
    ) : null}
    {!isAuthenticated ? (
      <NavigationItem link='/burger-builder/auth'>Authenticate</NavigationItem>
    ) : (
      <NavigationItem link='/burger-builder/logout'>Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
