'use strict';

module.exports = {
  get: function get (request, options) {
    return new Promise(function (resolve, reject) {
      request.get('/api/posts/' + options.params.post)
        .query(options.query)
        .end(onFinish(resolve, reject));
    });
  },
  index: function index (request, options) {
    return new Promise(function (resolve, reject) {
      request.get('/api/posts')
        .query(options.query)
        .end(onFinish(resolve, reject));
    });
  }
};

// private helper~
function onFinish (resolve, reject) {
  return function (err, res) {
    if (err || res.error) {
      reject(err || res.error);
    } else {
      resolve(res.body);
    }
  };
}
