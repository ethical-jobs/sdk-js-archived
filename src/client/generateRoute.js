/**
 * ...
 *
 * @return Promise
 */

export default function generateRoute(baseRoute, organisationId = null) {
  if (typeof baseRoute === 'string') {
    if (organisationId) {
      return `/organisation/${organisationId}${baseRoute}`;
    }
    return baseRoute;
  }
  return '';
}
