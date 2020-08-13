import React from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import { IngredientType } from '../../../components/Burger/Burger';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../containers/hoc/withErrorHandling';

type OrdersState = {
  orders: {
    customer: {
      address: {
        city: string;
        country: string;
        street: string;
        zip: string;
      };
      email: string;
      name: string;
    };
    deliveryMethod: string;
    ingredients: IngredientType;
    price: number;
  }[];
  loading: boolean;
};

class Orders extends React.Component<{}, OrdersState> {
  state = {
    orders: [
      {
        customer: {
          address: {
            city: '',
            country: '',
            street: '',
            zip: '',
          },
          email: '',
          name: '',
        },
        deliveryMethod: '',
        ingredients: {
          lettuce: 0,
          bacon: 0,
          cheese: 0,
          meat: 0,
        },
        price: 0,
      },
    ],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      let orders = [];
      const response = await axios.get('/orders.json');
      for (let key in response.data) {
        orders.push(response.data[key]);
      }
      this.setState({ orders: orders, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.error(error);
    }
  }

  render() {
    const orders = this.state.orders;
    let orderRender:
      | JSX.Element[]
      | JSX.Element = orders.map((order, index) => (
      <Order
        key={index}
        ingredients={order.ingredients}
        totalPrice={order.price}
      />
    ));
    if (this.state.loading) {
      orderRender = <Spinner />;
    }
    return <div>{orderRender}</div>;
  }
}

export default withErrorHandler(Orders, axios);
