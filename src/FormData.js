import canUseDom from './canUseDom';

if (! canUseDom()) {
  global.FormData = require('form-data')
}
