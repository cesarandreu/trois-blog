'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var Nav = React.createClass({
  displayName: 'Nav',
  getInitialState: function () {
    return {
      selected: 'home',
      links: {}
    };
  },
  render: function () {
    // var selected = this.props.selected || this.state.selected,
    var links = this.props.links || this.state.links,
      context = this.props.context,
      linkHTML = Object.keys(links)
      .filter(function (name) {
        return !!links[name].label;
      })
      .map(function (name) {
        var link = links[name];
        // var className = 'nav-item';
        // if (selected === name) {
        //   className += 'pure-menu-selected';
        // }
        return (
          <li className='nav-item' key={link.path}>
            <NavLink className='pure-button' routeName={link.page} context={context}>
              {link.label}
            </NavLink>
          </li>
        );
      });

    return (
      <nav>
        <ul className='nav-list'>
          {linkHTML}
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
