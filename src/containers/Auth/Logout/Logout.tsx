import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { logOut } from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

const mapState = () => ({});

const mapDispatch = {
  onLogout: () => logOut(),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Logout(props: PropsFromRedux) {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
  });

  return <Redirect to='/burger-builder' />;
}

export default connector(Logout);
