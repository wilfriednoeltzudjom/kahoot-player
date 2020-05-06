import {
  CHECK_GAME_PIN_REQUEST,
  CHECK_GAME_PIN_SUCCESS,
  CHECK_GAME_PIN_FAILURE,
  CHECK_USERNAME_REQUEST,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAILURE,
  UPDATE_PLAYER_LIST,
  UPDATE_PLAYER,
  QUESTION_INTRO,
  QUESTION_START,
  QUESTION_END,
  GAME_OVER,
} from '../types/session';

const initState = () => ({
  gameSession: {},
  game: {},
  players: [],
  player: {},
  current: {
    question: {},
    index: 0,
    total: 0,
    correct: false,
    points: 0,
  },
});

export default (state = initState(), action) => {
  switch (action.type) {
    case CHECK_GAME_PIN_REQUEST:
      return {
        gameSession: state.gameSession,
        game: state.game,
        current: state.current,
        players: state.players,
        player: state.player,
      };
    case CHECK_GAME_PIN_SUCCESS:
      return {
        ...state,
        gameSession: action.payload.gameSession,
      };
    case CHECK_GAME_PIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case CHECK_USERNAME_REQUEST:
      return {
        gameSession: state.gameSession,
        game: state.game,
        current: state.current,
        players: state.players,
        player: state.player,
      };
    case CHECK_USERNAME_SUCCESS:
      return {
        ...state,
        game: action.payload.game,
      };
    case CHECK_USERNAME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UPDATE_PLAYER_LIST:
      return {
        ...state,
        players: action.payload.players,
      };
    case UPDATE_PLAYER:
      return {
        ...state,
        player: action.payload.player,
      };
    case QUESTION_INTRO:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.current,
        },
      };
    case QUESTION_START:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.current,
        },
      };
    case QUESTION_END:
      return {
        ...state,
        current: {
          ...state.current,
          ...action.payload.current,
        },
      };
    case GAME_OVER:
      return {
        ...state,
        position: action.payload.position,
      };
    default:
      return state;
  }
};
