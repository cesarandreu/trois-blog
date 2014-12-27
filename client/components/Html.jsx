'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var manifest = require('../../manifest');

// added navigator.doNotTrack!=="1" so it won't load if DNT is enabled
var GA = 'var _gaq = [["_setAccount","UA-20550824-2"],["_trackPageview"]];';
GA += 'navigator.doNotTrack!=="1"&&(function() {var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true; ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);})();';

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Head
 * @constructor
 */
var Html = React.createClass({
  /**
   * Refer to React documentation render
   *
   * @method render
   * @return {Object} HTML head section
   */
  render: function () {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
          <meta name='viewport' content='width=device-width, user-scalable=no' />
          <meta name='description' content='not a blog, by Cesar Andreu'/>
          <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
          <link rel='stylesheet' href={manifest.build.css}/>
          <script dangerouslySetInnerHTML={{__html: GA}}></script>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        <script src={manifest.build.js} defer></script>
      </html>
    );
  }
});

module.exports = Html;
