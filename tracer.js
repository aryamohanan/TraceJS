'use strict';

const requireHook = require('./requireHook.js');
const { instrument: superagent } = require('./instrumentations/superagent.js');
const { instrument: got } = require('./instrumentations/got.js');
const Span = {
  module: '',
  data: {},
  error: null,
  date: null,
};

function init() {
  requireHook.initHook('superagent', superagent);
  requireHook.initHook('got', got);
}

module.exports = { Span, init };
