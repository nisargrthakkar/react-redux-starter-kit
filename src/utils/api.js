import Promise from 'bluebird';
import { getConfiguration } from '../utils/configuration';

const EventEmitter = require('event-emitter');

const TIMEOUT = 6000;

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
export const errors = new EventEmitter();

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise} of response body
 */
export async function get(path, suppressRedBox) {
  return bodyOf(request('get', path, null, suppressRedBox));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function post(path, body, suppressRedBox) {
  return bodyOf(request('post', path, body, suppressRedBox));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function put(path, body, suppressRedBox) {
  return bodyOf(request('put', path, body, suppressRedBox));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function del(path, suppressRedBox) {
  return bodyOf(request('delete', path, null, suppressRedBox));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 */
export async function request(method, path, body, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, body, suppressRedBox);
    return handleResponse(
      path,
      response
    );
  }
  catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
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

/**
 * Make best effort to turn a HTTP error or a runtime exception to meaningful error log message
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  }
  else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}
