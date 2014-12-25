'use strict';

var syncRepoAndLoadPosts = require('./lib/sync_repo_and_load_posts'),
  server = require('./server');

require('co')(function* () {
  try {
    yield syncRepoAndLoadPosts();
  } catch (err) {
    console.error(err);
    throw err;
  }

  server.init();
});
