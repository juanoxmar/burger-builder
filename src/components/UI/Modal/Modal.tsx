import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

type ModalProps = {
  children?: React.ReactNode;
  show: boolean;
  modalClosed?: () => void;
};

class Modal extends React.Component<ModalProps> {
  // Renders only if Modal is visible
  shouldComponentUpdate(nextProps: ModalProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // componentDidUpdate() {
  //   console.log('[Modal] DidUpdate');
  // }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
