import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';

const UnStyledCheckForm = ({
  className,
  inputPlaceHoler,
  buttonLabel,
  error,
  onSubmit,
}) => {
  const onLocalSubmit = (evt) => {
    evt.preventDefault();
    const { target } = evt;
    if (target && target.length > 0) {
      const { value, nodeName } = target[0];
      if (nodeName === 'INPUT') {
        onSubmit({ value });
      }
    }
  };

  return (
    <form className={className} onSubmit={onLocalSubmit}>
      <h1>Kahoot !</h1>
      {error && <span>{error}</span>}
      <input type="text" placeholder={inputPlaceHoler} />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    scale: 0;
  }
  to {
    opacity: 1;
    scale: 1;
  }
`;

const StyledCheckForm = styled(UnStyledCheckForm)`
  max-width: 85%;
  display: flex;
  flex-direction: column;
  text-align: center;

  > h1 {
    font-size: 3.5rem;
    font-style: italic;
    color: var(--color-white);
    margin-bottom: 1rem;
  }

  > span {
    display: inline-block;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    margin: 1rem 0;
    background: rgb(237, 28, 36);
    font-size: 14px;
    font-style: italic;
    color: var(--color-white);
    opacity: 0;
    scale: 0;
    animation: ${fadeIn} 500ms forwards;
  }

  > input {
    padding: 0.75rem 0.3rem;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    border: 2px solid rgb(210, 205, 185);
    margin-bottom: 0.5rem;
    flex: 1;

    ::placeholder {
      color: rgb(210, 205, 185);
    }

    :focus {
      outline: none;
      border-color: rgb(6, 1, 0);
    }
  }

  > button {
    display: inline-block;
    padding: 0.75rem 0.3rem;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: var(--color-white);
    background: rgb(51, 51, 51);
    border: 2px solid rgb(51, 51, 51);
    border-radius: 2px;
    transition: all 300ms ease-in-out;
    cursor: pointer;

    :hover {
      border-color: rgb(6, 1, 0);
      background: rgb(80, 80, 80);
    }

    :focus {
      outline: none;
    }

    ::-moz-focus-inner {
      border: none;
    }
  }
`;

const CheckForm = (props) => <StyledCheckForm {...props} />;

CheckForm.propTypes = {
  inputPlaceHoler: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
};

CheckForm.defautlProps = {
  error: null,
  onSubmit: () => {},
};

export default CheckForm;
