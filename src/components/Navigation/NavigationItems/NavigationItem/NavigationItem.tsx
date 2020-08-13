import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

type NavigationItemProps = {
  link: string;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ link, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink to={link} activeClassName={classes.active} exact>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
