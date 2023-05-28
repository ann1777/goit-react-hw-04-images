import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { LoadButton } from './LoadButton/LoadButton';
// import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import handleFetch from '../services/pixabayapi';
export class App extends Component {
  state = {
    images: [],
    inputValue: '',
    modalImg: '',
    status: 'idle',
    showModal: false,
    page: 1,
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({images: []})
      this.handleFetch();
    }
  }

  async handleFetch() {
    try {
      const { inputValue, page } = this.state;

      this.setState({
        isLoading: true,
      });

      const images = await handleFetch(inputValue, page);
      console.log(images);

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        isLoading: false,
        totalPage: Math.ceil(images.total / 12),
      }));

      if (images.length === 0) {
        toast.info('No images found.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      return toast.error('Error fetching images');
    }
  };

  getInputValue = handleValue => {
    this.resetPage();
    this.setState({ inputValue: handleValue });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  onLoadMore = () => {
    this.setState({ status: 'pending' });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (!inputValue) {
      toast.error('Please enter a search query');
      return;
    }
    this.props.onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { modalImg, showModal, page, totalPage, images, inputValue } = this.state;
    const loadMoreImgs = page < totalPage;
    // console.log(page, images);
    return (
      <>
        <Searchbar
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          getInputValue={this.getInputValue}
          onSubmit={this.handleChange}
        />
        <ImageGallery images={images} toggleModal={this.getLargeImg} />
        {showModal &&
          createPortal(
            <Modal url={modalImg} onClose={this.toggleModal} />,
            document.body
          )}
        {this.state.status === 'loaded' && (
          <LoadButton onLoadMore={this.onLoadMore} />
        )}
        {this.state.status === 'rejected' && (
          <div>
            Your generic alert to promt you that there are no images found, but
            I was too lazy to style it. Hell, at least it removed that "Load
            More" button from showing
          </div>
        )}
        {loadMoreImgs && <LoadButton onLoadMore={this.onLoadMore} />}
        <ToastContainer autoClose={1000} />
      </>
    );
  }
}

export default App;
