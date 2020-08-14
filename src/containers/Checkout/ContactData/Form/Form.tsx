import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import classes from './Form.module.css';
import { IngredientType } from '../../../../components/Burger/Burger';
import axios from '../../../../axios-orders';

type FormProps = {
  ingredients: IngredientType;
  price: number;
  order: () => void;
  load: () => void;
};

type IFormInputs = {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  delivery: string;
};

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required().min(5),
  delivery: yup.string().required(),
});

function Form({ ingredients, price, order, load }: FormProps) {
  const { register, handleSubmit, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      load();
      await axios.post('/orders.json', {
        customer: {
          name: data.name,
          email: data.email,
          address: data.address,
          city: data.city,
          zip: data.zip,
        },
        ingredients: ingredients,
        price: price,
        delivery: data.delivery,
      });
      order();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.Input}>
        <input
          className={classes.InputElement}
          type='text'
          placeholder='Name'
          name='name'
          ref={register}
        />
        <p>{errors.name?.message}</p>
        <input
          className={classes.InputElement}
          type='text'
          placeholder='Email'
          name='email'
          ref={register}
        />
        <p>{errors.email?.message}</p>

        <input
          className={classes.InputElement}
          type='text'
          placeholder='Address'
          name='address'
          ref={register}
        />
        <p>{errors.address?.message}</p>

        <input
          className={classes.InputElement}
          type='text'
          placeholder='City'
          name='city'
          ref={register}
        />
        <p>{errors.city?.message}</p>

        <input
          className={classes.InputElement}
          type='text'
          placeholder='Zip'
          name='zip'
          ref={register}
        />
        <p>{errors.zip?.message}</p>

        <select name='delivery' ref={register} className={classes.InputElement}>
          <option></option>
          <option value='Fast'>Fast</option>
          <option value='Slow'>Slow</option>
        </select>
        <p>{errors.delivery?.message}</p>

        <input type='submit' />
      </form>
    </React.Fragment>
  );
}

export default Form;
