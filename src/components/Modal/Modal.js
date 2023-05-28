import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);

export default class Modal extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {};

  el = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalWindow>
          <img src={this.props.url} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}