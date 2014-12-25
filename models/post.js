'use strict';

var thunkify = require('thunkify'),
  pygmentize = require('pygmentize-bundled'),
  marked = require('marked');

marked.setOptions({
  gfm: true,
  highlight: function (code, lang, callback) {
    pygmentize({lang: lang, format: 'html', options: {nowrap: true}}, code, function (err, res) {
      callback(err, res.toString().trim()); // prevents weird whitespace issues
    });
  }
});

module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    // url friendly name
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },

    // human friendly name
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },

    // compiled html from file
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },

    // post tags
    tags: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },

    // main markdown file
    fileName: {
      allowNull: false,
      type: DataTypes.STRING
    },

    // file contents
    file: {
      allowNull: false,
      type: DataTypes.TEXT
    },

    // publication date
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    createdAt: false,
    classMethods: {},
    instanceMethods: {
      renderBody: function* renderBody () {
        // Strip title from content
        // regex: /^#\s.*/
        // ^    : start of string
        // #    : followed by a hashtag
        // \s   : followed by a whitespace
        // .*   : followed by any amount of non-newline characters
        return yield thunkify(marked)(this.file.replace(/^#\s.*/, ''));
      }
    }
  });

  return Post;
};

