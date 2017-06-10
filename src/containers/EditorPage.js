import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Editor from '../components/Editor';

class EditorPage extends Component {
  render() {
    return <Editor />;
  }
}

export default EditorPage;
