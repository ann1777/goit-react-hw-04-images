import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
function ImageGalleryItem ({ url, tags, handleClick }) {
  console.log(url);
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
  handleClick: PropTypes.func.isRequired,
  // url: PropTypes.string.isRequired,
  // tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
