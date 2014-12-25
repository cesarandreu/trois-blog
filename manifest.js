'use strict';

var manifest = {
  styles: [
    // purecss.io
    'node_modules/purecss/base.css',
    'node_modules/purecss/grids.css',
    'node_modules/purecss/grids-responsive.css',
    'node_modules/purecss/buttons.css',
    'node_modules/purecss/forms.css',
    'node_modules/purecss/menus.css',

    // blog
    'client/assets/main.css',
    'client/assets/syntax-highlighting.css'
  ],

  images: [
    'client/assets/cesar.jpg'
  ],

  build: {
    css: '/assets/',
    js: '/assets/'
  }
};

try {
  manifest.build.css += require('./public/assets/styles-manifest.json')['styles.css'];
} catch (err) {
  manifest.build.css += 'styles.css';
}
try {
  manifest.build.js += require('./public/assets/application-manifest.json')['application.js'];
} catch (err) {
  manifest.build.js += 'application.js';
}

module.exports = manifest;
