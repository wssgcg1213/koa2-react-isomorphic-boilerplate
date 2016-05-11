'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStaticPlus = require('koa-static-plus');

var _koaStaticPlus2 = _interopRequireDefault(_koaStaticPlus);

var _koaOnerror = require('koa-onerror');

var _koaOnerror2 = _interopRequireDefault(_koaOnerror);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaMount = require('koa-mount');

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _reactRouter = require('../routes/react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _koaRouter3 = require('../routes/koa-router');

var _koaRouter4 = _interopRequireDefault(_koaRouter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyparser = (0, _koaBodyparser2.default)();
var router = (0, _koaRouter2.default)();

exports.default = function (app) {
  // reg middlewares
  app.use((0, _koaConvert2.default)(bodyparser));
  app.use((0, _koaConvert2.default)((0, _koaJson2.default)()));
  app.use((0, _koaConvert2.default)((0, _koaLogger2.default)()));
  // static
  app.use((0, _koaConvert2.default)((0, _koaStaticPlus2.default)(_path2.default.join(__dirname, '../../public'), {
    pathPrefix: ''
  })));

  // views
  app.use((0, _koaViews2.default)(_path2.default.join(__dirname, '../../views'), {
    extension: 'ejs'
  }));

  // reg routes
  router.use('/api', _koaRouter4.default.routes(), _koaRouter4.default.allowedMethods);
  app.use(router.routes(), router.allowedMethods());
  app.use(_reactRouter2.default);

  // 500 error
  (0, _koaOnerror2.default)(app, {
    template: 'views/500.ejs'
  });

  // logger
  app.use(function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var start, ms;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              start = new Date();
              _context.next = 3;
              return next();

            case 3:
              ms = new Date() - start;

              console.log(ctx.method + ' ' + ctx.url + ' - ' + ms + 'ms');

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  }());

  // 404
  app.use(function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ctx.status = 404;
              _context2.next = 3;
              return ctx.render('404');

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));
    return function (_x3) {
      return ref.apply(this, arguments);
    };
  }());
};

module.exports = exports['default'];