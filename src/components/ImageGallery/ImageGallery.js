import { ImgGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery ({ images, toggleModal }) {
  return (
    <>
      <ImgGallery>
        {images.map(({ id, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            url={largeImageURL}
            tags={tags}
            toggleModal={toggleModal}
          />
        ))}
      </ImgGallery>
    </>
  );
};

ImageGallery.propTypes = { 
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired, 
};
