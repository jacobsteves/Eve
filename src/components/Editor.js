import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Link } from 'react-router';
import brace from 'brace';
import AceEditor from 'react-ace';
import { split } from 'react-ace';

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
      theme: 'kr_theme'
    };
  },

  _changeCurrentLanguage(e) {
    e.preventDefault();
    this.setState({
      mode: e.target.value
    });
    console.log(e.target.value);
  },

  _changeCurrentTheme(e) {
    e.preventDefault();
    this.setState({
      theme: e.target.value
    });
    console.log(e.target.value);
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

  _setMode(e) {
    e.preventDefault();
    this.setState({
      mode: this.state.mode === 'java' ? 'html' : 'java',
      theme: this.state.theme === 'github' ? 'kr_theme' : 'github'
    });
    //console.log('dope');
  },

  render() {
    return (
      <div>
        <h1>React Slingshot</h1>

        <h2>Get Started</h2>
        <div style={{display: 'inline-block'}}>
          {this._renderLangaugePicker()}
          {this._renderThemePicker()}
          <form onSubmit={(e) => this._setMode(e)}>
            <input type='submit' value='Save'/>
          </form>
        </div>
        <AceEditor
          mode={this.state.mode}
          theme={this.state.theme}
          splits={3}
          orientation="below"
          value={''}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
});

export default Editor;
