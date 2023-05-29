import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
const ImageGalleryItem = ({ url, tags, handleClick }) => {
    return (
      <GalleryItem
        onClick={() => handleClick(url)}
      >
        <GalleryImage
          src={url}
          alt={tags}
        />
      </GalleryItem>
    );
  }
ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
