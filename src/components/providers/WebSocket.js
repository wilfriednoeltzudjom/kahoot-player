import React, { createContext } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { WS_BASE } from '../../api/websocket-client';
import sessionActions from '../../store/actions/session';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
  let socket;
  let ws;
  const dispatch = useDispatch();

  const join = ({ gamePin, username }) => {
    socket.emit('player-join', { gamePin, username });
  };

  const answer = ({ gamePin, questionId, answerId, responseTime }) => {
    socket.emit('player-answer', {
      gamePin,
      questionId,
      answerId,
      responseTime,
    });
  };

  const mapToCurrent = ({ currentQuestion, currentIndex, totalCount }) => ({
    question: currentQuestion,
    index: currentIndex,
    total: totalCount,
  });

  if (!socket) {
    socket = io.connect(WS_BASE, { transports: ['websocket'] });
    socket.on('connect', () => {
      socket.on('question-intro', ({ data }) => {
        dispatch(
          sessionActions.questionIntro({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('question-start', ({ data }) => {
        dispatch(
          sessionActions.questionStart({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('question-end', ({ data }) => {
        dispatch(
          sessionActions.questionEnd({
            current: mapToCurrent(data),
          })
        );
      });

      socket.on('player-list', ({ players }) => {
        dispatch(sessionActions.updatePlayerList({ players }));
      });

      socket.on('player', ({ player }) => {
        dispatch(sessionActions.updatePlayer({ player }));
      });

      socket.on('game-end', () => {
        dispatch(sessionActions.gameOver());
      });
    });

    ws = {
      socket,
      join,
      answer,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
