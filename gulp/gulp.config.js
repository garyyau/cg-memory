const src = './app/';
const dest = './dist/';


module.exports = {
  src,
  dest,
  sync: {
    port: 3000,
  },
  pug: {
    src: `${src}/`,
    dest: `${dest}`,
  },
  scss: {
    src: `${src}/scss/`,
    dest: `${dest}/css/`,
    output: `cgmemory.css`,
  },
  js: {
    src: `${src}/js/app.module.js`,
    dest: `${dest}/js/`,
    output: `bundle.js`,
  },
  node: {
    dest: `${dest}/js/`,
    output: `libs.js`,
    libs: ['angular', 'angular-moment', 'jquery', 'lodash', 'ng-lodash'],
  }
};
