'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var manifest = require('../../manifest');

// added navigator.doNotTrack==="1" so it won't load if DNT is enabled
var GA = 'navigator.doNotTrack==="1"?ga=function(){}:(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");';
GA += 'ga("create", "UA-20550824-2", "auto");ga("send", "pageview");';

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
