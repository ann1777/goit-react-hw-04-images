import { LoadMoreBtn, LBContainer } from './LoadButton.styled';
import PropTypes from 'prop-types';

export const LoadButton = ({ onLoadMore }) => {
  return (
    <LBContainer>
      <LoadMoreBtn type='button' onClick={onLoadMore}>
        Load more
      </LoadMoreBtn>
    </LBContainer>
  );
};

LoadButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};