'use strict';

var log = require('debug')('blog:worker:loader'),
  path = require('path'),
  fs = require('co-fs'),
  _ = require('lodash');

var config = require('../config'),
  models = require('../models')(config),
  Post = models.Post;

// Export postLoader
module.exports = postLoader;

// Run post loader if executed directly
if (!module.parent) {
  log('post_loader called directly');
  require('co').wrap(postLoader)(process.argv[2]);
}

// Loads and synchronizes all posts in passed location
// Default location is trois-blog/public/repo
function* postLoader (location) {
  location = location || path.resolve(__dirname, '../public/repo');
  log('location is set to %s', location);
  return yield (yield (yield getPostList(location)).map(getStaticPost)).map(syncPost);
}

// gets an array of folders in the given location
function* getPostList (location) {
  log('getting posts from %s', location);
  return (yield fs.readdir(location))
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'README.md');
  })
  .map(function (name) {
    return {location: location, name: name};
  });
}

// expects opts.name and opts.location
// loads and returns metadata in location/name/name.meta.json
function* getStaticPost (opts) {
  var name = opts.name,
    location = opts.location,
    postPath = path.join(location, name),
    metadataPath = path.join(postPath, name + '.meta.json');

  log('getting metadata from %', metadataPath);
  var metadata = require(metadataPath);
  metadata.file = yield fs.readFile(path.join(postPath, metadata.fileName), {encoding: 'utf8'});
  metadata.name = name;
  return metadata;
}

// sync metadata with posts
// if it doesn't exist it'll get built and stored
function* syncPost (metadata) {
  var post = yield Post.find({
    where: {name: metadata.name}
  });
  if (!post) {
    post = Post.build(metadata);
    log('%s not found, new instance built', metadata.name);
  }
  log('synchronizing %s', metadata.name);
  for (var key in metadata) {
    if (!_.isEqual(post[key], metadata[key])) {
      post[key] = metadata[key];
    }
  }
  post.body = yield post.renderBody();
  return yield post.save();
}
