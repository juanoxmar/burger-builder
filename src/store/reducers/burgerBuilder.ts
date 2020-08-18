import {
  ADD_INGREDIENT,
  REM_INGREDIENT,
  SET_INGREDIENTS,
  ERR_INGREDIENTS,
} from '../actions/actionTypes';

type AddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  key: keyof actionKey;
};

type RemIngredientAction = {
  type: typeof REM_INGREDIENT;
  key: keyof actionKey;
};

type SetIngredientAction = {
  type: typeof SET_INGREDIENTS;
  ingredients: actionKey;
};

type ErrIngredientAction = {
  type: typeof ERR_INGREDIENTS;
};

type actionType =
  | AddIngredientAction
  | RemIngredientAction
  | SetIngredientAction
  | ErrIngredientAction;

type actionKey = {
  lettuce: number;
  bacon: number;
  cheese: number;
  meat: number;
};

type initialStateType = {
  ingredients: {
    lettuce: number;
    bacon: number;
    cheese: number;
    meat: number;
  };
  price: number;
  error: boolean;
};

const initialState: initialStateType = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  price: 8,
  error: false,
};

const INGREDIENT_PRICES = {
  lettuce: 0.25,
  bacon: 1.0,
  cheese: 0.75,
  meat: 1.5,
};

const reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients![action.key] + 1,
        },
        price: state.price + INGREDIENT_PRICES[action.key],
      };
    }
    case REM_INGREDIENT: {
      return {
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients![action.key] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.key],
      };
    }
    case SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        price: 8,
        error: false,
      };
    }
    case ERR_INGREDIENTS: {
      return {
        ...state,
        error: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
