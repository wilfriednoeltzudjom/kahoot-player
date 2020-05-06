import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

import Layout from '../helpers/Layout';

const QuestionIntro = ({ className, current }) => {
  const [time, setTime] = useState(4);
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <Layout topLeft topRight bottomLeft bottomRight>
      <div className={className}>
        <h1>Question {current.index}</h1>
        <div>
          <span>{time}</span>
        </div>
      </div>
    </Layout>
  );
};

QuestionIntro.propTypes = {
  current: PropTypes.shape({
    index: PropTypes.number,
  }),
};

QuestionIntro.defaultProps = {
  current: {
    index: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    current: state.core.session.current,
  };
};

export default styled(connect(mapStateToProps)(QuestionIntro))`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(69, 162, 229);
  color: var(--color-white);
  padding: 2rem;
  font-style: italic;

  > h1 {
    font-size: 36px;
  }

  > div {
    background: rgb(163, 209, 242);
    height: 80px;
    width: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    > span {
      font-size: 36px;
      font-weight: 600;
      color: rgb(69, 162, 229);
    }
  }
`;
