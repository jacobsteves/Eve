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

import '../utils/aceImporter';
import {aceModes} from '../constants/aceModes';
import {aceThemes} from '../constants/aceThemes';

const Editor = React.createClass({
  getInitialState() {
    return {
      mode: 'html',
      theme: 'chaos',
      editorValue: this.props.fileData.currentFile.toString(),
      activeDirectory: [],
      isOpened: [],
      localLocationLen: 6,
      fileName: null,
      fileDirectory: null,
      openedFiles: [],
      storedFiles: [],
      editSettings: false,
      mustSave: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileData.currentFile !== this.state.editorValue) {
      const { fileDirectory, localLocationLen, fileName, storedFiles } = this.state;
      fileName && fileDirectory && storedFiles.push({
        name: fileName,
        directory: fileDirectory,
        content: nextProps.fileData.currentFile.toString()
      });
      this.setState({
        storedFiles: fileName && fileDirectory ? storedFiles : [],
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
      }, nextProps.fileData.mustSave ? this._saveFile() : null);
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
      <div className={'selectStyle'}>
        <p>Editor Theme</p>
        <select defaultValue={theme} onChange={(e) => this._changeCurrentTheme(e)}>
          {aceThemes.map((theme, i) => {
            return <option key={i} value={theme}>{theme}</option>;
          })}
        </select>
      </div>
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
    const { currentFileId, storedFiles } = this.state;
    storedFiles[currentFileId].content = value;
    this.setState({
      editorValue: value,
      storedFiles: storedFiles
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

    const { openedFiles, storedFiles } = this.state;

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
    if (openedFilesContainsNew && storedFiles) {
      console.log(storedFiles);
      storedFiles.map((file, index) => {
        if (file.directory === directory) {
          console.log('nice');
          this.setState({ editorValue: file.content, currentFileId: index });
        }
        return file;
      });
    } else {
      this.props.getSourceCode(directory);
    }
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
      <div className={'fullScreen'}>
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
              height={100 + '%'}
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
      <div className={'fullScreen'}>
        {!this.state.editSettings && this.state.fileDirectory &&
          <div className={'fullScreen'}>
            <div className={'editorSideMenu'}>
              {this._renderFiles(fileDirectories)}
            </div>
            <div className={'editorWindow'}>
              <div className={'fullScreen'}>
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
            <div className={'preferences'}>
              {this._renderThemePicker()}
              <div className={'lineBreak'} />
              <button className={'defaultButton'} onClick={() => this.props.toggleEditMode(false)}>Return</button>
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
