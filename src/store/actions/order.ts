import { PURCHASE_FAIL, PURCHASE_SUCCESS, PURCHASE_START } from './actionTypes';
import { RootState } from '../../index';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from '../../axios-orders';

const purchaseSuccess = (id: any, orderData: any) => ({
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

export const purchaseStart = (
  orderData: any
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    dispatch(purchase());
    const response = await axios.post('/orders.json', orderData);
    console.log(response.data);
    dispatch(purchaseSuccess(response.data.name, orderData));
  } catch (error) {
    dispatch(purchaseFail(error));
    console.error(error);
  }
};
