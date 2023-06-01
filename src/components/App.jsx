import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
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
    if (inputValue !== "") {
      setIsLoading(true);
      handleFetch(inputValue)
      .then(data => onHandleData(data.hits))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    }
  }, [inputValue, status]);

        // .then(response => {
        //   if (page > 1) {
        //     setImages(prevState => [...prevState, ...response.hits]);
        //   } else {
        //     setImages([...response.hits]);
        //     setTotalPage(Math.ceil(response.total - 12));
        //   }
        // })
        // .catch(
        //   error => {
        //     setErr(error);
        //     console.log(err);
        //   },
        //   [inputValue, page, err]
        // );
    // }

    //       } onHandleData(data.hits))
    //       .catch(error => console.log(error));
    //   }
    // }, [inputValue, status]);

    function onHandleData(data) {
      if (data.length === 12) {
        setStatus('loaded');
        setImages(prevData => [...prevData, ...data]);
        return;
      }
      if (data.length === 0) {
        setStatus('rejected');
        setImages([]);
        return;
      }
      setStatus('idle');
      setImages(prevData => [...prevData, ...data]);
      return;
    }
    // .then(({hits}) => {
    //   if (hits.length === 12) {
    //     setStatus('loaded');
    //     setImages(prevData => [...prevData, ...hits]);
    //     return;
    //   }
    //   else if (hits.length === 0) {
    //       toast.info('No images found.', {
    //         position: toast.POSITION.BOTTOM_CENTER,
    //       });
    //       setStatus('rejected');
    //       setImages([]);
    //       return;
    //     }
    //     setStatus('idle');
    //     setImages(prevData => [...prevData, ...hits]);
    //     return;
    //   });
    // }}, [inputValue, status]);

    const onLoadMore = () => {
      setStatus({ status: 'loaded' });
      setPage(page + 1);
    };

    const onSubmit = inputValue => {
      resetPage();
      setStatus('loaded');
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
          onSubmit={onSubmit}
        />
        {isLoading && <Loader/>}
        <ImageGallery images={images} handleClick={handleClick} />
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
