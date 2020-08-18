import {
  PURCHASE_FAIL,
  PURCHASE_SUCCESS,
  PURCHASE_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  PURCHASE_RESET,
} from './actionTypes';
import { RootState } from '../../index';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '../../axios-orders';
import { orderType } from '../../containers/Checkout/Orders/Orders';

const purchaseSuccess = (id: any, orderData: orderType) => ({
  type: PURCHASE_SUCCESS,
  orderId: id,
  orderData: orderData,
});

const purchaseFail = (error: any) => ({
  type: PURCHASE_FAIL,
  error: error,
});

const purchase = () => ({
  type: PURCHASE_START,
});

export const purchaseReset = () => ({
  type: PURCHASE_RESET,
});

export const purchaseStart = (
  orderData: orderType,
  token: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    dispatch(purchase());
    const response = await axios.post(`/orders.json?auth=${token}`, orderData);
    dispatch(purchaseSuccess(response.data.name, orderData));
  } catch (error) {
    dispatch(purchaseFail(error));
    console.error(error);
  }
};

const fetchOrdersSuccess = (orders: orderType[]) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders: orders,
});

const fetchOrdersFail = (error: Error) => ({
  type: FETCH_ORDERS_FAIL,
  error: error,
});

const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

export const fetchOrders = (
  token: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get(`/orders.json?auth=${token}`);
    const fetchedOrders: orderType[] = [];
    for (let key in response.data) {
      if (response.data[key].userId === localStorage.getItem('userId')) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
    }
    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};
