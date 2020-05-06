import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

import CheckForm from '../helpers/CheckForm';

import sessionActions from '../../store/actions/session';

const CheckPin = ({ className, checkGamePin, error }) => {
  const onSubmit = ({ value }) => {
    if (value && value.length === 8) {
      checkGamePin({ gamePin: value.toUpperCase() });
    }
  };

  return (
    <div className={className}>
      <CheckForm
        inputPlaceHoler="Game PIN"
        buttonLabel="Enter"
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
};

CheckPin.propTypes = {
  error: PropTypes.string,
  checkGamePin: PropTypes.func.isRequired,
};

CheckPin.defautlProps = {
  error: null,
};

const mapStateToProps = (state) => {
  return {
    error: state.core.session.error,
  };
};

const actions = {
  checkGamePin: sessionActions.checkGamePin,
};

export default styled(connect(mapStateToProps, actions)(CheckPin))`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(243, 211, 51);
  padding: 3rem;
`;
