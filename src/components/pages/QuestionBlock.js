import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

import { WebSocketContext } from '../providers/WebSocket';

import history from '../../helpers/history';

import Layout from '../helpers/Layout';

const QuestionBlock = ({ className, game, current }) => {
  const ws = useContext(WebSocketContext);

  const [start, setStart] = useState(0);
  useEffect(() => {
    setStart(Date.now());
  }, []);

  const onClick = (answerId) => {
    if (ws) {
      const responseTime = Math.floor((Date.now() - start) / 1000);
      console.log(`Answer ${answerId} in ${responseTime} s`);
      ws.answer({
        gamePin: game.pin,
        questionId: current.question._id,
        answerId,
        responseTime,
      });

      history.push('/question-lobby');
    }
  };

  return (
    <Layout topLeft topRight bottomLeft bottomRight>
      <div className={className}>
        {current.question.answers
          .filter((answer) => !!answer.title)
          .map((answer) => (
            <button key={answer._id} onClick={() => onClick(answer._id)}>
              <span></span>
            </button>
          ))}
      </div>
    </Layout>
  );
};

QuestionBlock.propTypes = {
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
  current: PropTypes.shape({
    question: PropTypes.shape({
      _id: PropTypes.string,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
        })
      ),
    }),
  }),
};

QuestionBlock.defaultProps = {
  game: {},
  current: {
    question: {
      answers: [],
    },
  },
};

const mapStateToProps = (state) => {
  return {
    game: state.core.session.game,
    current: state.core.session.current,
  };
};

export default styled(connect(mapStateToProps)(QuestionBlock))`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    position: relative;
    border: none;
    cursor: pointer;

    :focus {
      outline: none;
    }

    ::-moz-focus-inner {
      border: none;
    }

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 4px;
      border-radius: 4px;
      transition: all var(--button-animation-duration) ease-in-out;
    }

    > span {
      z-index: 1;
    }

    :nth-child(1) {
      background: var(--color-two-dark);

      ::before {
        background: var(--color-two);
      }

      :hover {
        ::before {
          background: var(--color-two-overlay);
          bottom: 2px;
        }
      }

      > span {
        width: 0;
        height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 50px solid var(--color-white);
      }
    }

    :nth-child(2) {
      background: var(--color-one-dark);

      ::before {
        background: var(--color-one);
      }

      :hover {
        ::before {
          background: var(--color-one-overlay);
          bottom: 2px;
        }
      }

      > span {
        width: 50px;
        height: 50px;
        background: var(--color-white);
        transform: rotate(45deg);
      }
    }

    :nth-child(3) {
      background: var(--color-three-dark);

      ::before {
        background: var(--color-three);
      }

      :hover {
        ::before {
          background: var(--color-three-overlay);
          bottom: 2px;
        }
      }

      > span {
        width: 60px;
        height: 60px;
        background: var(--color-white);
        border-radius: 50%;
      }
    }

    :nth-child(4) {
      background: var(--color-four-dark);

      ::before {
        background: var(--color-four);
      }

      :hover {
        ::before {
          background: var(--color-four-overlay);
          bottom: 2px;
        }
      }

      > span {
        width: 50px;
        height: 50px;
        background: var(--color-white);
      }
    }
  }
`;
