'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('../../views/App');

var _App2 = _interopRequireDefault(_App);

var _example = require('../../views/pages/example');

var _example2 = _interopRequireDefault(_example);

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: 'example', component: _example2.default },
      _react2.default.createElement(_reactRouter.Redirect, { from: 'example-redirect', to: '/example' })
    )
  )
);
module.exports = exports['default'];