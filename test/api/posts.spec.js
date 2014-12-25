'use strict';

var helper = require('./helper'),
  request = helper.request;

var url;

describe('API:Request:Posts', function () {

  beforeEach(function () {
    url = '/posts';
  });

  describe('GET /posts', function () {

    it('returns 200', function* () {
      yield request.get(url).expect(200);
    });

  });

  describe('GET /posts/:post', function () {

    // it('returns 200', function* () {
    //   yield request.get(url).expect(200);
    // });

  });

});
