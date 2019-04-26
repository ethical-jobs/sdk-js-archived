import canUseDom from './canUseDom';

/**
 * Detects if window._env_ is present
 * @return {bool}
 */
export default function hasWindowEnv() {
  return canUseDom() && typeof window._env_ !== 'undefined';
}

