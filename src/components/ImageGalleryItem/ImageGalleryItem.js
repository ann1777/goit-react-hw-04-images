import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
const ImageGalleryItem = ({ images, toggleModal }) => {
  return images.map(image => {
    return (
      <GalleryItem
        key={image.id}
        onClick={() => {
          toggleModal(image);
        }}
      >
        <GalleryImage
          src={image.webformatUPL}
          alt={image.tags}
          onClick={() => toggleModal(image)}
        />
      </GalleryItem>
    );
  });
};
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
