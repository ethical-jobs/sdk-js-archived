import axios from 'axios';

/**
 * ...
 *
 * @return Promise
 */

export default function makeRequest(params) {
  return axios.request(params)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error.response.data;
    });
}
