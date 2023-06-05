import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { LoadButton } from './LoadButton/LoadButton';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import handleFetch from '../services/pixabayapi';

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage] = useState(1);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const resetPage = () => {
    setPage(1);
  };

  useEffect(() => {
    if (status === 'pending') {
      setIsLoading(true);
      handleFetch(inputValue)
        .then(data => onHandleData(data.hits))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [inputValue, status]);

    function onHandleData(data) {
      if (data.length === 12) {
        setImages(prevData => [...prevData, ...data]);
        setStatus('loaded');
        return;
      }
      if (data.length === 0) {
        setImages([]);
        setStatus('rejected');
        return;
      }
      setImages(prevData => [...prevData, ...data]);
      return;
    }

    const onLoadMore = () => {
      setStatus('pending');
    }

    const onSubmit = inputValue => {
      if (!inputValue) {
        toast.error('Please enter a search query');
        return;
      }
      resetPage();
      setStatus('pending');
      setImages([]);
      setInputValue(inputValue);     
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
          onSubmit={onSubmit}
        />
        {isLoading && <Loader/>}
        <ImageGallery >
          <ImageGalleryItem images={images} handleClick={handleClick} />
        </ImageGallery> 
        {showModal && <Modal img={url} alt={alt} onClose={onCloseModal} />}
        {status === 'loaded' && <LoadButton onLoadMore={onLoadMore} />}
        {status === 'rejected' && (
          <div>
            Your generic alert to promt you that there are no images found, but
            I was too lazy to style it. Hell, at least it removed that "Load
            More" button from showing
          </div>
        )}
        {page < totalPage && <LoadButton onLoadMore={onLoadMore} />}
        <ToastContainer autoClose={1000} />
      </>
    );
  };
