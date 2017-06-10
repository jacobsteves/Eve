import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import brace from 'brace';
import AceEditor from 'react-ace';
import { split } from 'react-ace';

import 'brace/mode/html';
import 'brace/theme/kr_theme';

const HomePage = () => {
  return (
    <div>
      <h1>React Slingshot</h1>

      <h2>Get Started</h2>
      <button>Save</button>
      <AceEditor
        mode="html"
        theme="kr_theme"
        splits={3}
        orientation="below"
        value={''}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
    </div>
  );
};

export default HomePage;
