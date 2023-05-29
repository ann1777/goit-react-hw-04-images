import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);
const el = document.createElement('div');

function Modal ({ img, onClose }) {
  console.log(img, onClose)
  useEffect(() => {
    const handleCloseEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    modalRoot.appendChild(el);
    window.addEventListener('keydown', handleCloseEsc);
    return () => {
      modalRoot.removeChild(el);
      window.removeEventListener('keydown', handleCloseEsc);
    };
  }, [onClose]);

 

  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };  

    return createPortal(
      <Overlay onClick={handleClickBackdrop}>
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