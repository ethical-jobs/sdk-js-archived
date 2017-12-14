import { stringify as baseStringify } from 'query-string';

export default function stringify(params) {
  Object.keys(params).map(key => {
    if (params[key] === false) {
      params[key] = 0;
    } else if (params[key] === true) {
      params[key] = 1;
    }
  });
  return baseStringify(params, { arrayFormat: 'bracket' })
}