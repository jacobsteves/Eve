import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Editor from '../components/Editor';
import { saveFile } from '../actions/FileActions';

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
  return;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      saveFile
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
