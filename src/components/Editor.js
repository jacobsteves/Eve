import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import brace from 'brace';
import AceEditor from 'react-ace';
import {split as SplitEditor} from 'react-ace';
import {languageHandler} from '../utils/languageHandler.js'
import $ from 'jQuery';

import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/php';
import 'brace/mode/json'
import 'brace/theme/kr_theme';
import 'brace/theme/github';
import 'brace/theme/monokai';

const Editor = React.createClass({
  getInitialState() {
    return {
      mode: 'html',
      theme: 'kr_theme',
      editorValue: this.props.fileData.currentFile.toString(),
      activeDirectory: [],
      isOpened: [],
      localLocationLen: 6,
      fileName: null
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileData.currentFile !== this.state.editorValue) {
      const { fileName, localLocationLen } = this.state;
      this.setState({
        editorValue: nextProps.fileData.currentFile.toString(),
        activeDirectory: fileName.substring(localLocationLen, fileName.length).split('/')
      });
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
    this.props.saveFile(fileName, editorValue);
  },

  _onEditorChange(value) {
    this.setState({
      editorValue: value
    })
  },

  _changeCurDirectory(directory, index) {
    const { isOpened, localLocationLen } = this.state;
    this.setState({
      activeDirectory: directory.location.substring(localLocationLen, directory.location.length).split('/')
    })
  },

  _handleSideBarClick(directory, index) {
    const isDir = directory.isDir;
    isDir ? this._changeCurDirectory(directory, index) : this._changeCurFile(directory.location);
  },

  _changeCurFile(directory) {
    const splitFileByPeriod = directory.split('.');
    let newMode = splitFileByPeriod[splitFileByPeriod.length - 1];
    this.setState({
      mode: languageHandler(newMode),
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

  _renderFileChildren(fileDirectories, activeDirectory) {
    return (
      <ul>
        {fileDirectories && Array.from(fileDirectories).map((directory, index) => {
          return (
            <li
              className={'sideBarFileLink'}
              key={index}
              onClick={() => this._handleSideBarClick(directory, index)}>
                {directory.name.toString()}
                <ul className={directory.isDir ? 'isDirectory' : 'hide'}>
                  {activeDirectory[0] === directory.name &&
                    directory.isDir &&
                    activeDirectory.shift() &&
                    this._renderFileChildren(directory.children, activeDirectory)}
                </ul>
            </li>
          );
        })}
      </ul>
    );
  },

  _renderFiles(fileDirectories) {
    let { activeDirectory } = this.state;
    return (
      <ul>
        {fileDirectories && fileDirectories.map((directory, index) => {
          return (
            <li
              key={index}>
                <div
                  className={'sideBarFileLink'}
                  onClick={() => this._handleSideBarClick(directory, index)}>
                  {directory.name.toString()}
                </div>
                <ul className={directory.isDir ? 'isDirectory' : 'hide'}>
                  {activeDirectory[0] === directory.name &&
                    directory.isDir &&
                    activeDirectory.shift() &&
                    this._renderFileChildren(directory.children, activeDirectory)}
                </ul>
            </li>
          );
        })}
      </ul>
    );
  },

  render() {
    const fileDirectories = this.props.fileData.fileDirectories;
    return (
      <div>
        <h1>React Slingshot</h1>
        {this.state.fileName &&
          <div>
            <h2>Code!</h2>
            <h4>{this.state.fileName}</h4>
            <div className={'editorSideMenu'}>
              {this._renderFiles(fileDirectories)}
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
