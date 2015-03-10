'use strict';

var React = require('react/addons');
var App = require('./components/App.jsx');
require('./utils/socket_actions');

React.render(
  <App />,
  document.getElementById('app')
);
