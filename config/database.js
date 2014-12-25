'use strict';

module.exports = {
  'development': {
    'username': null,
    'password': null,
    'database': 'trois_blog_development',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'test': {
    'username': null,
    'password': null,
    'database': 'trois_blog_test',
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'logging': false
  },
  'production': {
    'username': null,
    'password': null,
    'database': 'trois_blog',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  }
};
