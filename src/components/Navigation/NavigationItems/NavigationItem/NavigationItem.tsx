import React from 'react';
import classes from './NavigationItem.module.css';

type NavigationItemProps = {
  link: string;
  active: boolean;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  link,
  active,
  children,
}) => (
  <li className={classes.NavigationItem}>
    <a href={link} className={active ? classes.active : null!}>
      {children}
    </a>
  </li>
);

export default NavigationItem;
