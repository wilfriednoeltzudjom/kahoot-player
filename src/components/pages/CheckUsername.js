import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { WebSocketContext } from '../providers/WebSocket';

import sessionActions from '../../store/actions/session';

import CheckForm from '../helpers/CheckForm';

const CheckUsername = ({ className, error, checkUsername }) => {
  const ws = useContext(WebSocketContext);

  const onSubmit = ({ value }) => {
    if (value) {
      const { sessionId } = queryString.parse(window.location.search);
      if (sessionId && ws) {
        checkUsername({ username: value, gameSessionUUID: sessionId, ws });
      }
    }
  };

  return (
    <div className={className}>
      <CheckForm
        inputPlaceHoler="Nickname"
        buttonLabel="OK, go!"
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
};

CheckUsername.propTypes = {
  error: PropTypes.string,
  checkUsername: PropTypes.func.isRequired,
};

CheckUsername.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  return {
    error: state.core.session.error,
  };
};

const actions = {
  checkUsername: sessionActions.checkUsername,
};

export default styled(connect(mapStateToProps, actions)(CheckUsername))`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(66, 191, 223);
  padding: 3rem;
`;
