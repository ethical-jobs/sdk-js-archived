import canUseDom from './canUseDom';

if (! canUseDom()) {
  require('localstorage-polyfill');
}
