import { SHOW_LOADING, HIDE_LOADING } from '../types/loading';

const showLoading = ({ message }) => {
  return {
    type: SHOW_LOADING,
    payload: { message },
  };
};

const hideLoading = () => ({
  type: HIDE_LOADING,
});

const actions = {
  showLoading,
  hideLoading,
};

export default actions;
