'use strict';

var co = require('co'),
  repoSync = require('./repo_sync'),
  postLoader = require('./post_loader'),
  log = require('debug')('blog:worker:task');

function* syncRepoAndLoadPosts () {
  try {
    log('starting repo sync');
    yield repoSync();
    log('starting post loader');
    yield postLoader();
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
