import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';
import useHttpErrorHandler from './hooks/http-error';

const withErrorHandler = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  axios: AxiosInstance
) =>
  function (props: P) {
    const { error, errorConfirmedHandler } = useHttpErrorHandler(axios);
    return (
      <React.Fragment>
        <Modal show={!!error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };

export default withErrorHandler;
