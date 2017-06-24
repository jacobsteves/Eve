import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from './NavBar';

import {
  toggleEditMode,
  toggleMustSave,
  toggleSideMenu
} from '../actions/FileActions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div className={'fullScreen'}>
        <NavBar
          toggleEditMode={this.props.actions.toggleEditMode}
          toggleMustSave={this.props.actions.toggleMustSave}
          toggleSideMenu={this.props.actions.toggleSideMenu}
          />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleEditMode,
      toggleMustSave,
      toggleSideMenu
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
