import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import brace from 'brace';
import AceEditor from 'react-ace';
import {split as SplitEditor} from 'react-ace';
import {languageHandler} from '../utils/languageHandler.js'
import PropTypes from 'prop-types';
import '../styles/EditorCanvas.css';
import '../../assets/font-awesome/css/font-awesome.min.css';
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
      fileName: null,
      fileDirectory: null,
      openedFiles: [],
      editSettings: false,
      mustSave: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileData.currentFile !== this.state.editorValue) {
      const { fileDirectory, localLocationLen } = this.state;
      this.setState({
        editorValue: nextProps.fileData.currentFile.toString(),
        activeDirectory: fileDirectory.substring(localLocationLen, fileDirectory.length).split('/')
      });
    }
    if (nextProps.fileData.editSettings !== this.state.editSettings) {
      this.setState({
        editSettings: nextProps.fileData.editSettings
      });
    }
    if (nextProps.fileData.mustSave !== this.state.mustSave) {
      this.setState({
        mustSave: nextProps.fileData.mustSave
      }, this._saveFile());
    }
  },

  _changeCurrentTheme(e) {
    e.preventDefault();
    this.setState({
      theme: e.target.value
    });
  },

  _renderThemePicker() {
    const { theme } = this.state;
    return (
      <select onChange={(e) => this._changeCurrentTheme(e)}>
        <option selected={theme === 'github'} value="github">github</option>
        <option selected={theme === 'kr_theme'} value="kr_theme">krTheme</option>
        <option selected={theme === 'monokai'} value="monokai">Monokai</option>
      </select>
    );
  },

  _saveFile(e) {
    e ? e.preventDefault() : null;
    const { editorValue, fileDirectory } = this.state;
    const fileContents = document.getElementById(fileDirectory);
    const argumentsList = [fileDirectory, editorValue];
    this.props.saveFile(fileDirectory, editorValue);
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
    const splitByPeriod = directory.split('.');
    let newMode = splitByPeriod[splitByPeriod.length - 1];

    const splitBySlash = directory.split('/');
    let newName = splitBySlash[splitBySlash.length - 1];

    const { openedFiles } = this.state;
    let openedFilesContainsNew = false;
    for(var i = 0; i < openedFiles.length; i++) {
        if (openedFiles[i].name == newName) {
            openedFilesContainsNew = true;
            break;
        }
    }
    !openedFilesContainsNew ? openedFiles.push({'directory': directory, 'name': newName}) : null;

    this.setState({
      mode: languageHandler(newMode),
      fileDirectory: directory,
      fileName: newName,
      openedFiles: openedFiles
    });
    this.props.getSourceCode(directory);
  },

  _changeFileName(e) {
    e.preventDefault();
    const value = ReactDOM.findDOMNode(this.refs.fileNameInput).value;
    this.setState({
      fileDirectory: value
    });
    this.props.getSourceCode('');
    this.props.getFileDirectories();
  },

  _removeTab(file) {
    let { openedFiles } = this.state;
    for(var i = 0; i < openedFiles.length; i++) {
      if(openedFiles[i].directory == file.directory) {
          console.log('yeet');
          openedFiles.splice(i, 1);
          break;
        }
    }
    this.setState({
      openedFiles: openedFiles
    })
  },

  _renderFileChildren(fileDirectories, activeDirectory) {
    return (
      <ul>
        {fileDirectories && Array.from(fileDirectories).map((directory, index) => {
          return (
            <li
              className={directory.isDir ? 'fileDirectory' : 'fileList'}
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

  _renderFiles(fileDirectories) {
    let { activeDirectory } = this.state;
    return (
      <ul>
        {fileDirectories && fileDirectories.map((directory, index) => {
          return (
            <li
              className={directory.isDir ? 'fileDirectory' : 'fileList'}
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

  _renderFileTabs() {
    const { openedFiles, fileName } = this.state;
    return (
      <div>
        <nav>
    			<ul className={'editorTabs'}>
            {openedFiles && openedFiles.map((file, i) => {
              return (
                <li
                  key={i}
                  id={fileName === file.name ? 'selected' : ''}
                  onClick={() => this._changeCurFile(file.directory)}>
                  <div>
                    <p>{file.name}</p>
                    <img
                      onClick={() => this._removeTab(file)}
                      className={'closeButton'}
                      src="https://cdn0.iconfinder.com/data/icons/basic-ui-elements-plain/385/010_x-512.png"
                      height="10px" />
                  </div>
                </li>);
            })}
    			</ul>
    		</nav>

        <section className={"editorCanvas"}>
          {this.state.fileName &&
            <AceEditor
              width={100 + '%'}
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
          }
      	</section>
      </div>
    );
  },

  render() {
    const fileDirectories = this.props.fileData.fileDirectories;
    return (
      <div>
        {!this.state.editSettings && this.state.fileDirectory &&
          <div>
            <div className={'editorSideMenu'}>
              {this._renderFiles(fileDirectories)}
            </div>
            <div className={'editorWindow'}>
              <div className={'editorTab'}>
                {this._renderFileTabs()}
              </div>
            </div>
          </div>
        }
        {!this.state.editSettings && !this.state.fileDirectory &&
          <div>
            <h3>Please create a filename</h3>
            <form onSubmit={(e) => this._changeFileName(e)}>
              <input type='text' ref='fileNameInput' placeholder='example.js' />
              <input type='submit'/>
            </form>
          </div>
        }
        {this.state.editSettings &&
          <div>
            <div style={{display: 'inline-block'}}>
              {this._renderThemePicker()}
              <button className={'btn btn-danger'} onClick={() => this.props.toggleEditMode(false)}>Return</button>
              <button className={'btn btn-danger'} onClick={(e) => this.props._saveFile(e)}>Save</button>
            </div>
          </div>
        }
      </div>
    );
  }
});

// <form onSubmit={(e) => this._saveFile(e)}>
//   <input type='submit' value='Save'/>
// </form>

Editor.propTypes = {
  saveFile: PropTypes.func.isRequired
}
export default Editor;
