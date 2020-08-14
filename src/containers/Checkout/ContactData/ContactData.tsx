import React from 'react';
import classes from './ContactData.module.css';
import { IngredientType } from '../../../components/Burger/Burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Form from './Form/Form';

type ContactDataProps = {
  ingredients: IngredientType;
  totalPrice: number;
} & RouteComponentProps;

class ContactData extends React.Component<ContactDataProps> {
  state = {
    loading: false,
  };

  orderLoad = () => {
    this.setState({ loading: true });
  };

  orderHandler = () => {
    this.props.history.push('/burger-builder');
  };

  render() {
    let form = (
      <Form
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        load={this.orderLoad}
        order={this.orderHandler}
      />
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
