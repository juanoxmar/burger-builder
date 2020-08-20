import React, { useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect, ConnectedProps } from 'react-redux';

type stateType = {
  auth: { token: string };
};

const mapState = (state: stateType) => ({
  isAuthenticated: state.auth.token !== '',
});

const connector = connect(mapState);

type Props = {
  children: React.ReactNode;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

type LayoutProps = Props & PropsFromRedux;

function Layout(props: LayoutProps) {
  const { children, isAuthenticated } = props;
  const [showSideDrawer, setShowDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowDrawer(false);
  };

  const openDrawerHandler = () => {
    setShowDrawer(true);
  };

  return (
    <React.Fragment>
      <Toolbar open={openDrawerHandler} isAuth={isAuthenticated} />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerCloseHandler}
        isAuth={isAuthenticated}
      />
      <main className={classes.Content}>{children}</main>
    </React.Fragment>
  );
}

export default connector(Layout);
