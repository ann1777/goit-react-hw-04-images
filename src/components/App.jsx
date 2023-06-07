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
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [isFirstGetImages, setIsFirstGetImages] = useState(true);
  const resetPage = () => {
    setPage(1);
  };

  useEffect(() => {
    if (isFirstGetImages) {
      return;
    }
    handleFetch(inputValue, page)
      .then(data => {
        if (page > 1) {
          setImages(prevData => [...prevData, ...data.hits]);
        } else {
          setImages([...data.hits]);
          setTotalPage(Math.ceil(data.total - 12));
        }
      })
      .catch(error => console.log(error))
      .finally = () => {
        setIsLoading(false)
        setPage(1)
        console.log(page)
        setIsFirstGetImages(false)}
  }, [inputValue, page, isFirstGetImages]);

  const onLoadMore = () => {
    if (page < totalPage) {
      console.log(page)
      setPage(prevState => prevState + 1);
    }
  };

  const onSubmit = inputValue => {
    if (!inputValue) {
      toast.error('Please enter a search query');
      return;
    }
    resetPage();
    setStatus('pending');
    setInputValue(prevState => inputValue);
    setIsFirstGetImages(false);
  };

  const handleClick = (url, alt) => {
    setShowModal(prevState => !prevState);
    setUrl(url);
    setAlt(alt);
    console.log(url, alt)
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
      {isLoading && <Loader />}
      <ImageGallery>
        <ImageGalleryItem images={images} handleClick={handleClick} />
      </ImageGallery>
      {showModal && <Modal img={url} alt={alt} onClose={handleClick} />}
      {status === 'rejected' && (
        <div>
          Your generic alert to promt you that there are no images found, but I
          was too lazy to style it. Hell, at least it removed that "Load More"
          button from showing
        </div>
      )}
      {page < totalPage && <LoadButton onLoadMore={onLoadMore} />}
      <ToastContainer autoClose={1000} />
    </>
  );
};
