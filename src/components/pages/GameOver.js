import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../helpers/Layout';

const GameOver = ({ className, position }) => {
  return (
    <Layout topLeft bottomLeft bottomRight>
      <div className={className}>
        <div>
          <span>{position}</span>
        </div>
        <p>You have done it!</p>
      </div>
    </Layout>
  );
};

GameOver.propTypes = {
  position: PropTypes.number,
};

GameOver.defaultProps = {
  position: 0,
};

const mapStateToProps = (state) => {
  return {
    position: state.core.session.position,
  };
};

const zoomIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(2);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  from {
    margin-bottom: 40%;
    opacity: 0;
  }
  to {
    margin-bottom: 0;
    opacity: 1;
  }
`;

export default styled(connect(mapStateToProps)(GameOver))`
  flex: 1;
  background: rgb(71, 23, 143);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100%;
    animation: ${slideInUp} 1s forwards;
    box-shadow: 0px 0px 10px 5px rgb(0, 0, 0, 0.1);

    > span {
      font-size: 72px;
      font-weight: 700;
      color: rgb(71, 23, 143);
      transform: scale(0);
      animation: ${zoomIn} 1s forwards;
      animation-delay: 1s;
    }
  }

  > p {
    margin-top: 2rem;
    font-size: 24px;
  }
`;
