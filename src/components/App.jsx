import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { LoadButton } from './LoadButton/LoadButton';
import Modal from './Modal/Modal';
// import Loader from './Loader/Loader';
import  { ToastContainer, toast } from 'react-toastify';
import handleFetch from '../services/pixabayapi';

  export const App = () => {
    const [images, setImages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false);
    const [page, setPage] = useState(1);
    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');
    const [totalPage] = useState(1);
    const resetPage = () => {
      setPage(1);
    };

  useEffect(() => {
    if (status === 'pending') {
      setStatus('loading');
      handleFetch(inputValue)
        .then(({hits}) => {
          if (hits.length === 12) {
            setStatus('loaded');
            setImages(prevData => [...prevData, ...hits]);
            return;
          }
          else if (hits.length === 0) {
              toast.info('No images found.', {
                position: toast.POSITION.BOTTOM_CENTER,
              });
              setStatus('rejected');
              setImages([]);
              return;
            }
            setStatus('idle');
            setImages(prevData => [...prevData, ...hits]);
            return;
          });
        }}, [inputValue, status]);

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

  const handleClick = (url, alt) => {
    setShowModal(prevState => !prevState);
    setUrl(url);
    setAlt(alt);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };


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
      <ImageGallery images={images} handleClick={handleClick}/>
      {showModal &&
          <Modal img={url} alt={alt} onClose={onCloseModal} />}
      {status === 'loaded' && (
        <LoadButton onLoadMore={onLoadMore} />
      )}
      {status === 'rejected' && (
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