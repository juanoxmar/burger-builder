import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

type ModalProps = {
  show: boolean;
  modalClosed: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, show, modalClosed }) => {
  return (
    <React.Fragment>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
