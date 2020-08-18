import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

type errorHandlerState = {
  error: Error | null;
};

const withErrorHandler = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  axios: AxiosInstance
) =>
  class extends React.Component<P, errorHandlerState> {
    reqInter: any;
    resInter: any;

    constructor(props: any) {
      super(props);

      this.state = {
        error: null,
      };
    }

    UNSAFE_componentWillMount() {
      this.reqInter = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInter = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInter);
      axios.interceptors.response.eject(this.resInter);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            show={!!this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };

export default withErrorHandler;
