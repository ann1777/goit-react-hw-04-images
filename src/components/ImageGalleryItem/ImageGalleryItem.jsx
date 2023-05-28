import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItemStyle } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ url, tags, togleModal }) => {
  return (
    <GalleryItemStyle.GallerryItem>
      <GalleryItemStyle.GallerryItemImg
        src={url}
        alt={tags}
        onClick={togleModal(url)}
      />
    </GalleryItemStyle.GallerryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
