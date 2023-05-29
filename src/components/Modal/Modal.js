import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);

function Modal ({ img, onClose }) {
  useEffect(() => {
    const handleCloseEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleCloseEsc);
    return () => {
      window.removeEventListener('keydown', handleCloseEsc);
    };
  }, [onClose]);


  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };  

    return createPortal(
      <Overlay onClick={useEffect} onClose={handleClickBackdrop}>
        <ModalWindow>
          <img src={img.largeImageURL} alt={''} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  };

  Modal.propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };
  export default Modal;