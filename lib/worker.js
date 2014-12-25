'use strict';
var log = require('debug')('blog:worker'),
  syncRepoAndLoadPosts = require('./sync_repo_and_load_posts');

log('timed starting worker');
setTimeout(syncRepoAndLoadPosts, 1000 * 60 * 60); // 60 mins
