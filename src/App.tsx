import React from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Orders from './containers/Checkout/Orders/Orders';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Switch>
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Route path='/' exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
