/**
 * Checks if structure is 'like' an ImmutableJS object
 * @param  {mixed}  maybeImmutable
 */
export function isImmutable(maybeImmutable) {
  if (maybeImmutable) {
    return typeof maybeImmutable.toJS === 'function';
  }
  return false;
}

/**
 * Jsonifies immutable structures
 * @param  {mixed} maybeImmutable
 */
export function fromImmutable(maybeImmutable) {
  return isImmutable(maybeImmutable) ? maybeImmutable.toJS() : maybeImmutable;
}