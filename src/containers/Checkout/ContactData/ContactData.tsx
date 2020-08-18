import React from 'react';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Form from './Form/Form';
import { connect, ConnectedProps } from 'react-redux';
import { mapState } from '../../BurgerBuilder/BurgerBuilder';
import withErrorHandler from '../../hoc/withErrorHandling';
import axios from '../../../axios-orders';

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

type ContactDataProps = RouteComponentProps & PropsFromRedux;

class ContactData extends React.Component<ContactDataProps> {
  state = {
    loading: false,
  };

  orderHandler = () => {
    this.props.history.push('/burger-builder');
  };

  render() {
    let form = <Form order={this.orderHandler} />;
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

export default connector(withErrorHandler(ContactData, axios));
