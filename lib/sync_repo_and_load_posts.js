'use strict';

var co = require('co'),
  repoSync = require('./repo_sync'),
  postLoader = require('./post_loader'),
  log = require('debug')('blog:worker:task');

function* syncRepoAndLoadPosts () {
  try {
    log('%s starting repo sync', (new Date()).toISOString());
    yield repoSync();
    log('%s starting post loader', (new Date()).toISOString());
    yield postLoader();
    log('%s finished syncRepoAndLoadPosts', (new Date()).toISOString());
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// if called directly, it should execute
if (!module.parent) {
  co(syncRepoAndLoadPosts);
}
module.exports = co.wrap(syncRepoAndLoadPosts);
