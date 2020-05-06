import { SHOW_LOADING, HIDE_LOADING } from '../types/loading';

const initState = () => ({
  message: '',
  visible: false,
});

export default (state = initState(), action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        message: action.payload.message,
        visible: true,
      };
    case HIDE_LOADING:
      return {
        message: '',
        visible: false,
      };
    default:
      return state;
  }
};
