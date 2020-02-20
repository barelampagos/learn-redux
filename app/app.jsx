var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

// Load foundation
$(document).foundation();

// app.css
require('style!css!sass!applicationStyles');

// JSX Code --> JS XML
ReactDOM.render(<p>Boilerplate v3</p>, document.getElementById('app'));

require('./redux-example.jsx');
