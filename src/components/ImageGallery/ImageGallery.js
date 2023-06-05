import { ImgGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery ({ children }) {
  console.log(children)
  return (
    <>
      <ImgGallery>
        {children}
      </ImgGallery>
    </>
  );
};

ImageGallery.propTypes = { 
  children: PropTypes.element.isRequired,  
};
