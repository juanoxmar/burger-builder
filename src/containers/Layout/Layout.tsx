import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect, ConnectedProps } from 'react-redux';

type LayoutStateType = {
  showSideDrawer: boolean;
};

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

class Layout extends React.Component<LayoutProps, LayoutStateType> {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  openDrawerHandler = () => {
    this.setState((prevState: LayoutStateType) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          open={this.openDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default connector(Layout);
