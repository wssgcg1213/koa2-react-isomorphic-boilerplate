'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cfgs = []; /**
                * Created at 16/4/11.
                * @Author Ling.
                * @Email i@zeroling.com
                */

_fs2.default.readdirSync(__dirname).map(function (filename) {
  if (filename === 'index.js') {
    return false;
  }
  try {
    var cfg = require('./' + filename);
    if ((0, _lodash.isPlainObject)(cfg)) {
      cfgs.push(cfg);
    }
  } catch (e) {}
});
cfgs.push(_default2.default);

var config = _lodash.defaultsDeep.apply(_lodash2.default, cfgs);
exports.default = config;
module.exports = exports['default'];