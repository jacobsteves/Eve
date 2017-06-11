import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Editor from './components/Editor';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import EditorPage from './containers/EditorPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EditorPage}/>
    <Route path="fuel-savings" component={FuelSavingsPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
    <Route path="utils/Files/php" component={AboutPage}/>
  </Route>
);
