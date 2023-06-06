import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';


function ImageGalleryItem({ images, handleClick }) {
  return images.map(image => {
    return (
      <GalleryItem key={image.id} onClick={() => handleClick(image.largeImageURL, image.tags)}>
        <GalleryImage src={image.webformatURL} alt={image.tags} />
      </GalleryItem>
    );
  });
}

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
