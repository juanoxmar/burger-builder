import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import classes from './Form.module.css';
import {
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
  MenuItem,
  Button,
  TextField,
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import axios from '../../../../axios-orders';
import { IngredientType } from '../../../../components/Burger/Burger';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
});

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
  name: yup.string().required('Name Required'),
  email: yup.string().email().required('Email Required'),
  address: yup.string().required('Address Required'),
  city: yup.string().required('City Required'),
  zip: yup.string().required('Zip Code Required').min(5),
  delivery: yup.string().required('Delivery Speed Required'),
});

function Form({ ingredients, price, order, load }: FormProps) {
  const style = useStyles();

  const { register, handleSubmit, errors, control, formState } = useForm<
    IFormInputs
  >({
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
        <ThemeProvider theme={theme}>
          <TextField
            className={style.margin}
            type='text'
            label='Name'
            name='name'
            inputRef={register}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant='outlined'
          />
          <TextField
            className={style.margin}
            type='text'
            label='Email'
            name='email'
            inputRef={register}
            variant='outlined'
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            className={style.margin}
            type='text'
            label='Address'
            name='address'
            inputRef={register}
            variant='outlined'
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            className={style.margin}
            type='text'
            label='City'
            name='city'
            inputRef={register}
            variant='outlined'
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            className={style.margin}
            label='Zip'
            type='text'
            name='zip'
            inputRef={register}
            variant='outlined'
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
          <Controller
            as={
              <TextField
                label='Delivery'
                className={style.margin}
                select
                variant='outlined'
                error={!!errors.delivery}
                helperText={errors.delivery?.message}
                value=''
              >
                <MenuItem value=''></MenuItem>
                <MenuItem value='fast'>Fast</MenuItem>
                <MenuItem value='slow'>Slow</MenuItem>
              </TextField>
            }
            name='delivery'
            defaultValue=''
            control={control}
          />
          <Button
            color='primary'
            type='submit'
            size='large'
            disabled={!formState.isValid}
          >
            ORDER
          </Button>
        </ThemeProvider>
      </form>
    </React.Fragment>
  );
}

export default Form;
