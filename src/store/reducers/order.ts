import {
  PURCHASE_FAIL,
  PURCHASE_SUCCESS,
  PURCHASE_START,
} from '../actions/actionTypes';
import { IngredientType } from '../../components/Burger/Burger';

export type orderDataType = {
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
  ingredients: IngredientType;
  price: number;
  delivery: string;
};

type initialStateType = {
  orders: orderDataType[];
  loading: boolean;
  purchased: boolean;
};

const initialState: initialStateType = {
  orders: [],
  loading: false,
  purchased: false,
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
  orderData: orderDataType;
};

type actionType =
  | PurchaseFailAction
  | PurchaseSuccessAction
  | PurchaseStartAction;

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
      };
    }
    default:
      return state;
  }
};

export default reducer;
