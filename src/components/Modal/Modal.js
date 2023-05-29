import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);
// el = document.createElement('div');

function Modal ({ toggleModal, url, alt }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        toggleModal('', '');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };  

    return createPortal(
      <Overlay onClick={handleClickBackdrop}>
        <ModalWindow>
          <img src={url} alt={alt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  };

  Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };
  export default Modal;