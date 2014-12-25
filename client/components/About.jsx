'use strict';
var React = require('react');

var About = React.createClass({
  displayName: 'About',
  render: function () {
    return (
      <section>
        <h1 className='content-subhead'>About</h1>
        <p>This is a description of the site.</p>
      </section>

    );
  }
});

module.exports = About;
