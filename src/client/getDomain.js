/**
 * ...
 *
 * @return Promise
 */

export default function getDomain(environment = '') {
  switch (environment.toLowerCase()) {
    default:
    case 'production':
      return 'http://api.ethicaljobs.com.au';
    case 'test':
      return 'http://api.ethicalstaging.com.au';
    case 'development':
      return 'http://api.ethicaljobs.local';
  }
}
