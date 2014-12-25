'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var PostItem = React.createClass({
  getInitialState: function () {
    return {};
  },
  render: function () {
    var post = this.props.post,
      date = new Date(post.createdAt),
      navLinkProperties = {
        context: this.props.context,
        routeName: 'post',
        navParams: {post: post.name}
      };

    return (
      <section className='post'>
        <h2 className='post-title'>
          <NavLink {...navLinkProperties}>
            {post.title}
          </NavLink>
        </h2>
        <div className='post-information'>
          <span className='post-date'>
            Posted on <time dateTime={date.toISOString()}>{date.toUTCString()}</time>
          </span>
        </div>
      </section>
    );
  }
});

module.exports = PostItem;
