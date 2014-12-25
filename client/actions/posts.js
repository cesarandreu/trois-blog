'use strict';

module.exports = {
  getList: function (context, payload, done) {
    context.dispatch('RECEIVE_POST_LIST_START', payload);
    context.resource('posts').index(payload)
    .then(function (posts) {
      if (payload.navigate) {
        context.dispatch('UPDATE_PAGE_TITLE', {pageTitle: 'not a blog'});
      }
      context.dispatch('RECEIVE_POST_LIST_SUCCESS', posts);
      done(null);
    }, function (err) {
      context.dispatch('RECEIVE_POST_LIST_FAILURE', payload);
      done(err);
    });
  },
  getOne: function (context, payload, done) {
    context.dispatch('RECEIVE_POST_START', payload);
    context.resource('posts').get(payload)
    .then(function (post) {
      if (payload.navigate) {
        context.dispatch('UPDATE_PAGE_TITLE', {pageTitle: post.title});
      }
      context.dispatch('RECEIVE_POST_SUCCESS', post);
      done(null);
    }, function (err) {
      context.dispatch('RECEIVE_POST_FAILURE', payload);
      done(err);
    });
  }
};
