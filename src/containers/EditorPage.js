import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editor from '../components/Editor';

import {
  saveFile,
  getSourceCode,
  getFileDirectories
} from '../actions/FileActions';

class EditorPage extends Component {
  getInitialState() {
    return {
      fileName: ''
    };
  }

  _changeFileName(e) {
    e.preventDefault();
    this.setState({
      fileName: e.target.value
    });
  }

  render() {
    if (true) {
      return (
        <Editor
          saveFile={this.props.actions.saveFile}
          getSourceCode={this.props.actions.getSourceCode}
          getFileDirectories={this.props.actions.getFileDirectories}
          fileData={this.props.fileData}
        />
      );
    } else {
      return (
        <div>
          <h3>Please create a filename</h3>
          <input type='text' onSubmit={(e) => this._changeFileName(e)} />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    fileData: state.fileData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveFile,
      getSourceCode,
      getFileDirectories
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
