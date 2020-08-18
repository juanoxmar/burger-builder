import {
  ADD_INGREDIENT,
  REM_INGREDIENT,
  SET_INGREDIENTS,
  ERR_INGREDIENTS,
} from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../index';
import { Action } from 'redux';
import axios from '../../axios-orders';

export const addIngredient = (key: string) => ({
  type: ADD_INGREDIENT,
  key: key,
});

export const remIngredient = (key: string) => ({
  type: REM_INGREDIENT,
  key: key,
});

type ingType = {
  lettuce: number;
  bacon: number;
  cheese: number;
  meat: number;
};

const setIngredients = (ingredients: ingType) => ({
  type: SET_INGREDIENTS,
  ingredients: ingredients,
});

const errIngredients = () => ({
  type: ERR_INGREDIENTS,
});

export const initIngredients = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const response = await axios.get('/ingredients.json');
    dispatch(setIngredients(response.data));
  } catch (error) {
    dispatch(errIngredients());
    console.error(error);
  }
};
