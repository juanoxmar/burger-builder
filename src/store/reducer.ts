import { ADD_INGREDIENT, REM_INGREDIENT } from './actions';

type AddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  key: keyof actionKey;
};

type RemIngredientAction = {
  type: typeof REM_INGREDIENT;
  key: keyof actionKey;
};

type actionType = AddIngredientAction | RemIngredientAction;

type actionKey = {
  lettuce: number;
  bacon: number;
  cheese: number;
  meat: number;
};

const initialState = {
  ingredients: { lettuce: 0, bacon: 0, cheese: 0, meat: 0 },
  price: 8,
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
          [action.key]: state.ingredients[action.key] + 1,
        },
        price: state.price + INGREDIENT_PRICES[action.key],
      };
    }
    case REM_INGREDIENT: {
      return {
        ingredients: {
          ...state.ingredients,
          [action.key]: state.ingredients[action.key] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.key],
      };
    }
    default:
      return state;
  }
};

export default reducer;
