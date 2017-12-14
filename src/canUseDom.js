/**
 * Detects if DOM is present
 * @return {bool}
 */
export default function canUseDom() {
  return typeof window !== 'undefined';
}
