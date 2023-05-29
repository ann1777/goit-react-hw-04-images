import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { LoadButton } from './LoadButton/LoadButton';
import Modal from './Modal/Modal';
// import Loader from './Loader/Loader';
import  { ToastContainer, toast } from 'react-toastify';
import handleFetch from '../services/pixabayapi';

  export const App = () => {
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [modalImg, setModalImg] = useState('');
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage] = useState(1);
    const resetPage = () => {
      setPage(1);
    };

  useEffect(() => {
    if (status === 'pending') {
      setStatus('loading');
      handleFetch(inputValue)
        .then(data => handleFetchData(data.hits))
        .catch(error => console.log(error));
    }
  }, [inputValue, status]);

  function handleFetchData(data) {
    try {
      if (data.length === 12) {
        setStatus('loaded');
        setImages(prevData => [...prevData, ...data]);
        return;
      }

      if (images.length === 0) {
        toast.info('No images found.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setStatus('rejected');
        setImages([]);
        return;
      }
      setStatus('idle');
      setImages(prevData => [...prevData, ...data]);
      return;
    } catch (error) {
      this.setState({ isLoading: false });
      return toast.error('Error fetching images');
    }
  };

  const toggleModal = () => {
    setShowModal(({ showModal }) => ({ showModal: !showModal }));
  };

  const getLargeImg = url => {
    toggleModal();
    setModalImg({ modalImg: url });
  };

  const onLoadMore = () => {
    setStatus({ status: 'pending' });
    setPage(page + 1);
  };

  const handleSearch = e => {
    resetPage();
    setStatus('pending');
    setImages([]);
    setInputValue(inputValue);
    if (!inputValue) {
      toast.error('Please enter a search query');
      return;
    }
  };

  // const handleClick = photo => {
  //   setClickedImg(photo);
  //   setShowModal(true);
  // };

  return (
    <>
      <Searchbar
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={inputValue}
        onSubmit={handleSearch}
      />
      <ImageGallery images={images} toggleModal={getLargeImg}>
      <ImageGalleryItem images={images} onClick={toggleModal} />
      </ImageGallery>
      {showModal &&
        createPortal(
          <Modal url={modalImg} onClose={toggleModal} />,
          document.body
        )}
      {this.state.status === 'loaded' && (
        <LoadButton onLoadMore={onLoadMore} />
      )}
      {this.state.status === 'rejected' && (
        <div>
          Your generic alert to promt you that there are no images found, but
          I was too lazy to style it. Hell, at least it removed that "Load
          More" button from showing
        </div>
      )}
      {(page < totalPage) && <LoadButton onLoadMore={onLoadMore} />}
      <ToastContainer autoClose={1000} />
    </>
  );
}