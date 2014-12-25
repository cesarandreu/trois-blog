'use strict';

function Fetcher (fetchers) {
  if (!(this instanceof Fetcher)) {
    return new Fetcher(fetchers);
  }

  this.fetchers = {};
  for (var fetcher in fetchers) {
    if (fetchers.hasOwnProperty(fetcher)) {
      this.fetchers[fetcher] = fetchers[fetcher];
    }
  }
}

Fetcher.prototype.register = function (name, fetcher) {
  this.fetchers[name] = fetcher;
  return this;
};

Fetcher.prototype.get = function get (name) {
  if(!this.fetchers[name]) {
    throw new Error('Register the fetcher first: ' + name);
  }
  return this.fetchers[name];
};

module.exports = Fetcher;
