import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;
