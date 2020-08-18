import React from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/index';
import { connect, ConnectedProps } from 'react-redux';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Checkout/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

type stateProps = {
  auth: { token: string };
};

const mapState = (state: stateProps) => ({
  isAuth: state.auth.token !== '',
});

const mapDispatch = {
  authCheck: () => authCheckState(),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.authCheck();
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/burger-builder/auth' component={Auth} />
        <Route path='/burger-builder' exact component={BurgerBuilder} />
        <Redirect to='/burger-builder' />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/burger-builder/checkout' component={Checkout} />
          <Route path='/burger-builder/orders' component={Orders} />
          <Route path='/burger-builder/logout' component={Logout} />
          <Route path='/burger-builder/auth' component={Auth} />
          <Route path='/burger-builder' exact component={BurgerBuilder} />
          <Redirect to='/burger-builder' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default connector(App);
