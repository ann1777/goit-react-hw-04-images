import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
const ImageGalleryItem = ({url, tags, toggleModal }) => {
  return (
    <>
      <GalleryItem>
        <GalleryImage
        src={url}
        alt={tags} 
        onClick={()=>toggleModal(url)} />
      </GalleryItem>
    </>
  );
};
ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
