/**
 * Checks if structure is 'like' an ImmutableJS object
 * @param  {mixed}  maybeImmutable
 */
export default function isImmutable(maybeImmutable) {
  if (maybeImmutable) {
    return typeof maybeImmutable.toJS === 'function';
  }
  return false;
}