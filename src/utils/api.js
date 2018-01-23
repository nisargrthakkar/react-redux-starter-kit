import Promise from 'bluebird';
import { getConfiguration } from '../utils/configuration';

const TIMEOUT = 6000;

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @returns {Promise} of response body
 */
export async function get(path) {
  return bodyOf(request('get', path, null));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @returns {Promise}  of response body
 */
export async function post(path, body) {
  return bodyOf(request('post', path, body));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @returns {Promise}  of response body
 */
export async function put(path, body) {
  return bodyOf(request('put', path, body));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @returns {Promise}  of response body
 */
export async function del(path) {
  return bodyOf(request('delete', path, null));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 */
export async function request(method, path, body) {
  try {
    const response = await sendRequest(method, path, body);
    return handleResponse(
      path,
      response
    );
  }
  catch (error) {
    throw error;
  }
}

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;
}

/**
 * Constructs and fires a HTTP request
 */
async function sendRequest(method, path, body) {

  try {
    const endpoint = url(path);
    const token = getConfiguration('AUTH_TOKEN') !== '' ? getConfiguration('AUTH_TOKEN') : '';
    const headers = getRequestHeaders(body, token);
    const options = body
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Receives and reads a HTTP response
 */
async function handleResponse(path, response) {
  try {
    const responseBody = await response.text();
    const responseBodyJson = {};
    responseBodyJson.status = response.status;
    try {
      responseBodyJson.data = responseBody
        ? JSON.parse(responseBody)
        : null;
    } catch (error) {
      responseBodyJson.data = null;
    }
    return {
      status: response.status,
      headers: response.headers,
      body: responseBodyJson
        ? responseBodyJson
        : null
    };
  } catch (e) {
    throw e;
  }
}

function getRequestHeaders(body, token) {
  const headers = body
    ? { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    : { 'Accept': 'application/json' };

  if (token) {
    return { ...headers, Authorization: token };
  }
  return headers;
}

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}
