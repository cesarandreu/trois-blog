'use strict';

var actions = {
  posts: require('../actions/posts')
};

module.exports = {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    label: 'Home',
    action: function (context, payload, done) {
      context.executeAction(actions.posts.getList, payload, done);
    }
  },
  post: {
    path: '/posts/:post',
    method: 'get',
    page: 'post',
    action: function (context, payload, done) {
      context.executeAction(actions.posts.getOne, payload, done);
    }
  },
  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    label: 'About',
    action: function (context, payload, done) {
      context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'about' });
      done();
    }
  }
};
