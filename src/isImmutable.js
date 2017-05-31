/**
 * Checks if structure is an ImmutableJS object
 * @param  {mixed}  maybeImmutable
 */
export default function isImmutable(maybeImmutable) {
  if (maybeImmutable) {
    return typeof maybeImmutable.toJS === 'function';
  }
  return false;
}