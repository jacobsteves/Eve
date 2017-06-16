import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import brace from 'brace';
import AceEditor from 'react-ace';
import {split as SplitEditor} from 'react-ace';
import $ from 'jQuery';

import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/php';
import 'brace/theme/kr_theme';
import 'brace/theme/github';
import 'brace/theme/monokai';

const Editor = React.createClass({
  getInitialState() {
    return {
      mode: 'html',
      theme: 'kr_theme',
      editorValue: this.props.fileData.currentFile.toString(),
      fileName: null
    };
  },

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    if (nextProps.fileData.currentFile !== this.state.editorValue) {
      this.setState({ editorValue: nextProps.fileData.currentFile.toString() });
    }
  },

  propTypes: {
    saveFile: React.PropTypes.func.isRequired
  },

  _changeCurrentLanguage(e) {
    e.preventDefault();
    this.setState({
      mode: e.target.value
    });
  },

  _changeCurrentTheme(e) {
    e.preventDefault();
    this.setState({
      theme: e.target.value
    });
  },

  _renderLangaugePicker() {
    return (
      <select onChange={(e) => this._changeCurrentLanguage(e)}>
        <option default value="html">HTML</option>
        <option default value="java">Java</option>
        <option default value="php">PHP</option>
      </select>
    );
  },

  _renderThemePicker() {
    //console.log(this.props.fileData.currentFile.toString());
    //console.log(this.state.editorValue);
    return (
      <select onChange={(e) => this._changeCurrentTheme(e)}>
        <option default value="github">github</option>
        <option default value="kr_theme">krTheme</option>
        <option default value="monokai">Monokai</option>
      </select>
    );
  },

  _saveFile(e) {
    e.preventDefault();
    const { editorValue, fileName } = this.state;
    const fileContents = document.getElementById(fileName);
    const argumentsList = [fileName, editorValue];
    //console.log('editorval: ', editorValue);
    this.props.saveFile(fileName, editorValue);
  },

  _onEditorChange(value) {
    console.log('newval: ', value);
    this.setState({
      editorValue: value
    })
  },

  _changeCurFile(directory) {
    this.setState({
      fileName: directory
    });
    this.props.getSourceCode(directory);
  },

  _changeFileName(e) {
    e.preventDefault();
    const value = ReactDOM.findDOMNode(this.refs.fileNameInput).value;
    this.setState({
      fileName: value
    });
    this.props.getSourceCode('');
    this.props.getFileDirectories();
  },

  _renderFiles() {
    const fileDirectories = this.props.fileData.fileDirectories;
    return (
      <ul>
        {fileDirectories && fileDirectories.map((directory, index) => {
          return (
            <li
              className={'sideBarFileLink'}
              key={index}
              onClick={() => this._changeCurFile(directory)}>
                {directory.toString()}
            </li>
          );
        })}
      </ul>
    );
  },

  render() {
    return (
      <div>
        <h1>React Slingshot</h1>
        {this.state.fileName &&
          <div>
            <h2>Code!</h2>
            <h4>{this.state.fileName}</h4>
            <div className={'editorSideMenu'}>
              {this._renderFiles()}
            </div>
            <div className={'editorWindow'}>
              <div style={{display: 'inline-block'}}>
                {this._renderLangaugePicker()}
                {this._renderThemePicker()}
                <form onSubmit={(e) => this._saveFile(e)}>
                  <input type='submit' value='Save'/>
                </form>
              </div>
              <AceEditor
                ref='aceEditor'
                mode={this.state.mode}
                theme={this.state.theme}
                onChange={(value) => this._onEditorChange(value)}
                splits={3}
                orientation="below"
                value={this.state.editorValue}
                name={this.state.fileName}
                editorProps={{$blockScrolling: true}}
              />
            </div>
          </div>
        }
        {!this.state.fileName &&
          <div>
            <h3>Please create a filename</h3>
            <form onSubmit={(e) => this._changeFileName(e)}>
              <input type='text' ref='fileNameInput' placeholder='example.js' />
              <input type='submit'/>
            </form>
          </div>
        }
      </div>
    );
  }
});

export default Editor;
