'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Content = React.createClass({
  displayName: 'Content',
  render: function () {
    return <div className='content pure-u-1 pure-u-md-3-4'>{this.props.children}</div>;
  }
});

var Footer = React.createClass({
  displayName: 'Footer',
  render: function () {
    var footerLinks = [{
      body: 'Twitter',
      title: 'twitter',
      url: 'https://twitter.com/cesarandreu'
    }, {
      body: 'Github',
      title: 'github',
      url: 'https://github.com/cesarandreu'
    }].map(function (link) {
      return (
        <li key={link.title}>
          <a href={link.url} title={link.title}>
            {link.body}
          </a>
        </li>
      );
    });

    return (
      <footer className='footer'>
        <nav className='pure-menu pure-menu-horizontal pure-menu-open'>
          <ul>{footerLinks}</ul>
        </nav>
      </footer>
    );
  }
});

var Sidebar = React.createClass({
  displayName: 'Sidebar',
  render: function () {
    return (
      <div className='sidebar pure-u-1 pure-u-md-1-4'>
        <header className='header'>
          <hgroup>
            <NavLink className='blog-link' routeName='home' context={this.props.context}>
              <h1 className='blog-title'>Cesar Andreu</h1>
            </NavLink>
            <h2 className='blog-tagline'>not a blog</h2>
          </hgroup>
          {this.props.children}
        </header>
      </div>
    );
  }
});

module.exports = {
  Content: Content,
  Footer: Footer,
  Sidebar: Sidebar
};
