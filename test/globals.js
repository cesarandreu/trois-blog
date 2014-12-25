'use strict';
require('debug')('setting global.expect to chai.expect');
global.expect = require('chai').expect;
