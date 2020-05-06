import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../helpers/history';

import Loading from './helpers/Loading';

import CheckPin from './pages/CheckPin';
import CheckUsername from './pages/CheckUsername';
import Lobby from './pages/Lobby';
import QuestionIntro from './pages/QuestionIntro';
import QuestionBlock from './pages/QuestionBlock';
import QuestionLobby from './pages/QuestionLobby';
import QuestionResult from './pages/QuestionResult';
import GameOver from './pages/GameOver';

class App extends Component {
  render() {
    const { loading } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <Loading message={loading.message} visible={loading.visible} />

          <Router history={history}>
            <Switch>
              <Route exact path="/" component={CheckPin} />
              <Route path="/join" component={CheckUsername} />
              <Route path="/answer" component={QuestionBlock} />
              <Route path="/lobby" component={Lobby} />
              <Route path="/get-ready" component={QuestionIntro} />
              <Route path="/question-lobby" component={QuestionLobby} />
              <Route path="/question-result" component={QuestionResult} />
              <Route path="/game-over" component={GameOver} />
            </Switch>
          </Router>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loading: PropTypes.shape({
    message: PropTypes.string,
    visible: PropTypes.bool,
  }),
};

App.defaultProps = {
  loading: {
    message: null,
    visible: false,
  },
};

const mapStateToProps = (state) => {
  return {
    loading: state.ui.loading,
  };
};

export default connect(mapStateToProps)(App);
