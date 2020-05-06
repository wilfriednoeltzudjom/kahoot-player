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

import sessionService from '../services/session';

import loadingActions from './loading';

import history from '../../helpers/history';

const checkGamePin = ({ gamePin }) => (dispatch) => {
  dispatch({ type: CHECK_GAME_PIN_REQUEST });
  dispatch(loadingActions.showLoading({ message: 'Checking game PIN ...' }));

  sessionService
    .checkGamePin(gamePin)
    .then((response) => {
      const { data } = response;
      history.push(`/join?sessionId=${data.uuid}`);

      dispatch(loadingActions.hideLoading());
      dispatch({
        type: CHECK_GAME_PIN_SUCCESS,
        payload: { gameSession: data },
      });
    })
    .catch((error) => {
      dispatch(loadingActions.hideLoading());
      if (error && error.response) {
        const { data } = error.response;
        if (data) {
          dispatch({
            type: CHECK_GAME_PIN_FAILURE,
            payload: { error: data.message },
          });
        }
      } else {
        dispatch({
          type: CHECK_GAME_PIN_FAILURE,
          payload: { error: error.message },
        });
      }
    });
};

const checkUsername = ({ username, gameSessionUUID, ws }) => (dispatch) => {
  dispatch({ type: CHECK_USERNAME_REQUEST });
  dispatch(
    loadingActions.showLoading({
      message: 'Checking username availability ...',
    })
  );

  sessionService
    .checkUsername(username, gameSessionUUID)
    .then((response) => {
      const { data } = response;
      ws.join({ username, gamePin: data.pin });

      history.push('/lobby');
      dispatch(loadingActions.hideLoading());
      dispatch({
        type: CHECK_USERNAME_SUCCESS,
        payload: { game: data },
      });
    })
    .catch((error) => {
      dispatch(loadingActions.hideLoading());
      if (error && error.response) {
        const { data } = error.response;
        if (data) {
          dispatch({
            type: CHECK_USERNAME_FAILURE,
            payload: { error: data.message },
          });
        }
      } else {
        dispatch({
          type: CHECK_USERNAME_FAILURE,
          payload: { error: error.message },
        });
      }
    });
};

const updatePlayer = ({ player }) => ({
  type: UPDATE_PLAYER,
  payload: { player },
});

const updatePlayerList = ({ players = [] }) => ({
  type: UPDATE_PLAYER_LIST,
  payload: { players },
});

const questionIntro = ({ current }) => {
  history.push('/get-ready');
  return {
    type: QUESTION_INTRO,
    payload: { current },
  };
};

const questionStart = ({ current }) => {
  history.push('/answer');
  return {
    type: QUESTION_START,
    payload: { current },
  };
};

const questionEnd = ({ current }) => (dispatch, getState) => {
  const data = { ...current };
  const player = getState().core.session.player;
  if (player) {
    const playerAnswer = player.playerAnswers.find(
      (answer) => answer.question.uuid === current.question.uuid
    );
    if (playerAnswer) {
      data.correct = playerAnswer.answer.isCorrect;
      data.points = playerAnswer.points;
    }
  }

  history.push('/question-result');

  dispatch({
    type: QUESTION_END,
    payload: { current: data },
  });
};

const gameOver = () => (dispatch, getState) => {
  history.push(`/game-over?gameId=${getState().core.session.game.uuid}`);
  let position = 0;
  const { player, players } = getState().core.session;
  if (players && player) {
    const index = players.findIndex((p) => p.uuid === player.uuid);
    if (index !== -1) position = index + 1;
  }

  dispatch({
    type: GAME_OVER,
    payload: { position },
  });
};

const actions = {
  checkGamePin,
  checkUsername,
  updatePlayer,
  updatePlayerList,
  questionIntro,
  questionStart,
  questionEnd,
  gameOver,
};

export default actions;
