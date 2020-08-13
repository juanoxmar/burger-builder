import React from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import { IngredientType } from '../../../components/Burger/Burger';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';

type ContactDataProps = {
  ingredients: IngredientType;
  totalPrice: number;
} & RouteComponentProps;

class ContactData extends React.Component<ContactDataProps> {
  state = {
    customer: {
      name: '',
      email: '',
      address: {
        street: '',
        city: '',
        zip: '',
        country: '',
      },
    },
    deliveryMethod: '',
    loading: false,
  };

  orderHandler = async () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Juan',
        email: 'juan@ramirez.com',
        address: {
          street: 'Street 1',
          city: 'Seattle',
          zip: '12345',
          country: 'USA',
        },
      },
      deliveryMethod: 'fastest',
    };

    try {
      await axios.post('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/');
    } catch (error) {
      this.setState({ loading: false });
      console.error(error);
    }
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Email'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Street'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='Postal'
        />
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
        <Button btnType='Success' clicked={this.orderHandler}>
          Order
        </Button>
      </div>
    );
  }
}

export default ContactData;
