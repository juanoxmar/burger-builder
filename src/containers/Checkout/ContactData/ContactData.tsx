import React from 'react';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { RouteComponentProps } from 'react-router-dom';
import Form from './Form/Form';
import { connect, ConnectedProps } from 'react-redux';
import { mapState } from '../../BurgerBuilder/BurgerBuilder';

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

type ContactDataProps = RouteComponentProps & PropsFromRedux;

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
        ingredients={this.props.ing}
        price={this.props.prc}
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

export default connector(ContactData);
