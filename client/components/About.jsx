'use strict';
var React = require('react');

var About = React.createClass({
  displayName: 'About',
  render: function () {
    return (
      <section>
        <h1 className='content-subhead'>About</h1>
        <div className='pure-u-1 pure-u-sm-2-3'>
          <h2>Cesar Andreu</h2>
          <p className='about'>
            Born in Puerto Rico; fluent in English and Spanish. Love to build things and hack around. Working in Mountain View, CA at <a href='http://www.treasuredata.com' title='Treasure Data'>Treasure Data</a> as a software engineer. Living in Sunnyvale, CA. You can reach me on <a href="https://github.com/cesarandreu">Github</a> or <a href="https://twitter.com/cesarandreu">Twitter</a>.
          </p>
        </div>
        <div className='pure-u-1 pure-u-sm-1-3'>
          <img className='avatar' src='/assets/cesar.jpg'></img>
        </div>
      </section>
    );
  }
});

module.exports = About;
