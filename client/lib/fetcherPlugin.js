'use strict';

module.exports = function fetcherPlugin (opts) {
  var request = opts.request,
    fetcher = opts.fetcher;

  return {
    name: 'Fetcher',

    // fetcher and request can be overwritten
    // used to achieve isomorphic goodness~
    plugContext: function (options) {
      if (options.request) {
        request = options.request;
      }
      if (options.fetcher) {
        fetcher = options.fetcher;
      }

      return {
        plugActionContext: function plugActionContext (actionContext) {
          // usage: actionContext.resource(resourceName).action(payload);
          // example: actionContext.resource('posts').get({post: 'first_post'});
          actionContext.resource = function (resourceName) {
            return generateService(fetcher.get(resourceName), request);
          };
        }
      };
    }
  };
};

function generateService (resource, request) {
  var service = {};
  Object.keys(resource).forEach(function (key) {
    service[key] = function (payload) {
      return resource[key](request, payload);
    };
  });
  return service;
}
