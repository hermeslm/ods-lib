/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['component/**/*.module.js', 'component/**/*.js', '!component/**/*_test.js'],
  srcHtml: ['component/**/*.html', 'component/**/*.htm'],
  destHtml: './component',
  tests: 'component/**/*_test.js',
  buildFolder: 'dist',
  buildJsFilename: 'ods-lib.js',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();',
  useStrict: '\'use strict\';\n',

};