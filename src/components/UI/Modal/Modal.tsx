import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

type ModalProps = {
  children?: React.ReactNode;
  show: boolean;
  modalClosed?: () => void;
};

function Modal(props: ModalProps) {
  const { show, children, modalClosed } = props;

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
}

export default React.memo(
  Modal,
  (props, nextProps) =>
    nextProps.show === props.show && nextProps.children === props.children
);
