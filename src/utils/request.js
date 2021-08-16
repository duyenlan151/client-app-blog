import axios from 'axios';
import { env } from 'env';


axios.defaults.baseURL = env.apiURL;

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  
  // return response.json();
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(response.status === 401){
    // cookies.remove('token', { path: '/' });
    // cookies.remove('token_expiration', { path: '/' });
    // // localStorage.setItem('clear_token' , true);
    
    if (typeof window !== 'undefined')
      window.location = '/login';
  }
  // const error = new Error(response.statusText);
  // error.response = response;
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {

  return axios(url, options)
    .then((response) => parseJSON(response))
    .catch((error) => checkStatus(error.response));

}