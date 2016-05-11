'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _match(location) {
  return new _promise2.default(function (resolve, reject) {
    (0, _reactRouter.match)(location, function (error, redirectLocation, renderProps) {
      if (error) {
        return reject(error);
      }
      resolve({ redirectLocation: redirectLocation, renderProps: renderProps });
    });
  });
}

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var _ref, redirectLocation, renderProps;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _match({ routes: _routes2.default, location: ctx.url });

          case 3:
            _ref = _context.sent;
            redirectLocation = _ref.redirectLocation;
            renderProps = _ref.renderProps;

            if (!redirectLocation) {
              _context.next = 10;
              break;
            }

            ctx.redirect(redirectLocation.pathname + redirectLocation.search);
            _context.next = 17;
            break;

          case 10:
            if (!renderProps) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return ctx.render('index', {
              title: 'React',
              app: (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps))
            });

          case 13:
            _context.next = 17;
            break;

          case 15:
            _context.next = 17;
            return ctx.throw(404, 'Not found');

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](0);
            _context.next = 23;
            return ctx.throw(500, _context.t0.message);

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 19]]);
  }));
  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
}();

module.exports = exports['default'];