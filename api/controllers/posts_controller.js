'use strict';

var Router = require('koa-router'),
  _ = require('lodash');

function PostsController () {
  var routes = new Router()
    .get('/posts', PostsController.index)
    .get('/posts/:post', PostsController.show);
  return routes.middleware();
}

PostsController.index = function* index () {
  var Post = this.models.Post,
    query = this.request.query,
    // page = _.parseInt(query.page),
    // per = _.parseInt(query.per),
    sortBy = query.sortBy,
    direction = (query.direction || '').toUpperCase(),
    attributes = ['id', 'name', 'title', 'tags', 'createdAt'];

  // page = page >= 1 ? page : 1;
  // per = per >= 1 ? per : 12;
  sortBy = _.contains(_.keys(attributes), sortBy) ? sortBy : 'createdAt';
  direction = _.contains(['ASC', 'DESC'], direction) ? direction : 'DESC';

  var result = yield Post.findAndCountAll({
    // limit: per,
    attributes: attributes,
    // offset: per * (page - 1),
    order: [[sortBy, direction]]
  });

  this.body = {
    posts: result.rows,
    count: result.count,
    // page: page,
    // pages: Math.ceil(result.count / per),
    // per: per,
    sortBy: sortBy,
    direction: direction
  };

};

PostsController.show = function* show () {
  var post = yield this.models.Post.find({
    where: {name: this.params.post}
  });
  if (!post) {
    this.throw(404);
  }
  this.body = post;
};

module.exports = PostsController;
