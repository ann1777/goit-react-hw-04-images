import { ImgGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery ({ images, handleClick }) {
  console.log(images)
  return (
    <>
      <ImgGallery>
        {images.map(({ id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            url={largeImageURL}
            tags={tags}
            handleClick={handleClick}
          />
        ))}
      </ImgGallery>
    </>
  );
};

ImageGallery.propTypes = { 
  images: PropTypes.element.isRequired,
  handleClick: PropTypes.func.isRequired,  
};
