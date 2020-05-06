import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { connect } from 'react-redux';

const UnStyledLayout = ({
  className,
  children,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  game,
  player,
  current,
}) => {
  return (
    <div className={className}>
      <header>
        {topLeft && <span>PIN: {game.pin}</span>}
        {topRight && (
          <span>
            {current.index} of {current.total}
          </span>
        )}
      </header>
      <main>{children}</main>
      <footer>
        {bottomLeft && <span>{player.username}</span>}
        {bottomRight && <span>{player.totalScore}</span>}
      </footer>
    </div>
  );
};

UnStyledLayout.propTypes = {
  game: PropTypes.shape({
    pin: PropTypes.string,
  }),
  player: PropTypes.shape({
    username: PropTypes.string,
    totalScore: PropTypes.number,
  }),
  current: PropTypes.shape({
    index: PropTypes.number,
    total: PropTypes.number,
  }),
};

UnStyledLayout.defaultProps = {
  game: {},
  player: {
    totalScore: 0,
  },
  current: {
    index: 0,
    total: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    current: state.core.session.current,
    game: state.core.session.game,
    player: state.core.session.player,
  };
};

const StyledLayout = styled(connect(mapStateToProps)(UnStyledLayout))`
  flex: 1;
  display: flex;
  flex-direction: column;

  > header,
  > footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: 20px;
      font-weight: 700;
    }
  }

  > header {
    padding: 1rem;

    ::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgb(217, 217, 217);
    }
  }

  > footer {
    padding: 0.75rem 1rem;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgb(217, 217, 217);
    }

    > span:nth-child(2) {
      display: inline-block;
      padding: 0.25rem 2.5rem;
      background: rgb(51, 51, 51);
      color: var(--color-white);
      border-radius: 3px;
    }
  }

  > main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const Layout = (props) => <StyledLayout {...props} />;

Layout.propTypes = {
  topLeft: PropTypes.bool,
  topRight: PropTypes.bool,
  bottomLeft: PropTypes.bool,
  bottomRight: PropTypes.bool,
};

Layout.defaultProps = {
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false,
};

export default Layout;
