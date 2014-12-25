'use strict';
var React = require('react');
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
      return <a href={link.url} title={link.title} key={link.title}>{link.body}</a>;
    });

    return (
      <footer className='footer'>
        <div className='pure-menu pure-menu-horizontal pure-menu-open'>
          <nav className='nav'>
            <ul>
              <li>{footerLinks}</li>
            </ul>
          </nav>
        </div>
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
            <h1 className='brand-title'>Cesar Andreu</h1>
            <h2 className='brand-tagline'>not a blog</h2>
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
