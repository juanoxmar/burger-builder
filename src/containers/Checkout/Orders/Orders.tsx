import React from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../containers/hoc/withErrorHandling';
import { IngredientType } from '../../../components/Burger/Burger';
import { fetchOrders } from '../../../store/actions/index';
import { ConnectedProps, connect } from 'react-redux';

type customerType = {
  city: string;
  address: string;
  zip: string;
  email: string;
  name: string;
};

export type orderType = {
  customer: customerType;
  delivery: string;
  ingredients: IngredientType;
  price: number;
  userId: string;
};

type stateType = {
  order: { orders: orderType[]; loading: boolean };
  auth: { token: string };
};

const mapState = (state: stateType) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
});

const mapDispatch = {
  onFetchOrders: (token: string) => fetchOrders(token),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Orders extends React.Component<PropsFromRedux, stateType> {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    const orders: orderType[] | [] = this.props.orders;
    let orderRender;
    if (orders.length >= 1) {
      orderRender = orders.map((order, index) => (
        <Order
          key={index}
          ingredients={order.ingredients}
          totalPrice={order.price}
        />
      ));
    }
    if (this.props.loading) {
      orderRender = <Spinner />;
    }
    return <div>{orderRender}</div>;
  }
}

export default connector(withErrorHandler(Orders, axios));
