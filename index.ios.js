'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var BasicApp = require('./app/home')

AppRegistry.registerComponent('BasicApp', () => BasicApp);
