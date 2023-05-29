import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);
// el = document.createElement('div');

function Modal ({ url, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current.focus();
  }, []);

    const handleKeyDown = e => {
      if (
        (e.currentTarget === e.target && e.type === 'click') ||
        (e.code === 'Escape')
      ) {
        window.addEventListener('keydown', handleKeyDown);
        onClose();
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    

  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };  

    return createPortal(
      <Overlay onClick={handleClickBackdrop} onKeyDown={handleKeyDown}>
        <ModalWindow>
          <img src={url} alt={''} />
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