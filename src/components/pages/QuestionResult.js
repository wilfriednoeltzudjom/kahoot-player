import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../helpers/Layout';

const QuestionResult = ({ className, current }) => {
  return (
    <Layout topLeft topRight bottomLeft bottomRight>
      <div className={className}>
        {current.correct ? (
          <div className="correct">
            <div>
              <h1>Correct</h1>
              <span>
                <i className="fas fa-check fa-3x"></i>
              </span>
              <div>
                <span>+ {current.points}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="incorrect">
            <div>
              <h1>Incorrect</h1>
              <span>
                <i className="fas fa-times fa-3x"></i>
              </span>
              <div>
                <span>May the force be with you</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

QuestionResult.propTypes = {
  current: PropTypes.shape({
    correct: PropTypes.bool,
    points: PropTypes.number,
  }),
};

QuestionResult.defaultProps = {
  current: {
    correct: false,
    points: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    current: state.core.session.current,
  };
};

const animation = keyframes`
  from {
    margin-top: 40%;
    opacity: 0
  }
  to {
    margin-top: 0;
    opacity: 1
  }
`;

export default styled(connect(mapStateToProps)(QuestionResult))`
  flex: 1;
  display: flex;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    padding: 2rem;

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      animation: ${animation} 800ms forwards;

      > h1 {
        font-size: 32px;
        margin-bottom: 2rem;
        font-style: italic;
      }

      > div {
        margin-top: 2rem;

        > span {
          font-size: 24px;
          font-weight: 700;
        }
      }
    }

    &.correct {
      background: rgb(101, 191, 57);

      > div {
        > div {
          background: rgb(66, 124, 37);
          padding: 1rem 2rem;
        }
      }
    }

    &.incorrect {
      background: rgb(255, 51, 86);

      > div {
        > div {
          background: rgb(217, 42, 71);
          padding: 1rem 2rem;

          > span {
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
