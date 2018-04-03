import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Editor from './components/Editor';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import EditorPage from './containers/EditorPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EditorPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
    <Route path="utils/Files/php" component={AboutPage}/>
  </Route>
);
