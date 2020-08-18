import React from 'react';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Form from './Form/Form';
import { connect, ConnectedProps } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandling';
import axios from '../../../axios-orders';

type stateType = {
  order: {
    loading: boolean;
    purchased: boolean;
  };
};

const mapState = (state: stateType) => ({
  loading: state.order.loading,
  purchased: state.order.purchased,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

type ContactDataProps = RouteComponentProps & PropsFromRedux;

class ContactData extends React.Component<ContactDataProps> {
  render() {
    let form = <Form />;
    if (this.props.loading) {
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
