import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logOut } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

type stateType = {
  auth: {};
};

const mapState = (state: stateType) => ({});

const mapDispatch = {
  onLogout: () => logOut(),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Logout extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to='/burger-builder' />;
  }
}

export default connector(Logout);
