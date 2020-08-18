import {
  PURCHASE_FAIL,
  PURCHASE_SUCCESS,
  PURCHASE_START,
  PURCHASE_RESET,
  FETCH_ORDERS_FAIL,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
} from '../actions/actionTypes';
import { orderType } from '../../containers/Checkout/Orders/Orders';
import updateObject from '../utility';

type initialStateType = {
  orders: orderType[];
  loading: boolean;
  purchased: boolean;
};

const initialState: initialStateType = {
  orders: [],
  loading: false,
  purchased: false,
};

type PurchaseResetAction = {
  type: typeof PURCHASE_RESET;
};

type PurchaseStartAction = {
  type: typeof PURCHASE_START;
};

type PurchaseFailAction = {
  type: typeof PURCHASE_FAIL;
  error: Error;
};

type PurchaseSuccessAction = {
  type: typeof PURCHASE_SUCCESS;
  orderId: number;
  orderData: orderType;
};

type FetchOrderSuccess = {
  type: typeof FETCH_ORDERS_SUCCESS;
  orders: orderType[];
};

type FetchOrderFail = {
  type: typeof FETCH_ORDERS_FAIL;
  error: Error;
};

type FetchOrderStart = {
  type: typeof FETCH_ORDERS_START;
};

type actionType =
  | PurchaseFailAction
  | PurchaseSuccessAction
  | PurchaseStartAction
  | FetchOrderFail
  | FetchOrderStart
  | FetchOrderSuccess
  | PurchaseResetAction;

const reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case PURCHASE_START:
      return {
        ...state,
        loading: true,
      };
    case PURCHASE_FAIL:
      return state;
    case PURCHASE_SUCCESS: {
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
      };
    }
    case PURCHASE_RESET:
      return updateObject(state, { purchased: false });
    case FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });
    case FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default reducer;
