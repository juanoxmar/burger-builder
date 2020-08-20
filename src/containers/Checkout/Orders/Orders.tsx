import React, { useEffect } from 'react';
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

function Orders(props: PropsFromRedux) {
  const { token, orders, loading, onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(token);
  }, [onFetchOrders, token]);

  const ordersArr: orderType[] | [] = orders;
  let orderRender;
  if (ordersArr.length >= 1) {
    orderRender = ordersArr.map((order, index) => (
      <Order
        key={index}
        ingredients={order.ingredients}
        totalPrice={order.price}
      />
    ));
  }
  if (loading) {
    orderRender = <Spinner />;
  }
  return <div>{orderRender}</div>;
}

export default connector(withErrorHandler(Orders, axios));
