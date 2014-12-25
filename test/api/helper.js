'use strict';

var api = require('../../api');
exports.request = require('supertest-as-promised')(api.callback());
exports.models = api.models;
exports.api = api;
