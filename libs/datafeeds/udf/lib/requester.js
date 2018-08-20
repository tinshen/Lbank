import {logMessage} from './helpers';

// import {http} from '../../../javascript/config-http'

var Requester = /** @class */ (function () {
  function Requester(headers) {
    if (headers) {
      this._headers = headers;
    }
  }

  Requester.prototype.sendRequest = function (datafeedUrl, urlPath, params, config = {}) {
    if (params !== undefined) {
      var paramKeys = Object.keys(params);
      if (paramKeys.length !== 0) {
        urlPath += '?';
      }
      urlPath += paramKeys.map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key].toString());
      }).join('&');
    }
    logMessage('New request: ' + urlPath);
    // Send user cookies if the URL is on the same origin as the calling script.
    var options = {
      credentials: 'same-origin',
      // method: 'POST',
      // ...config,
      // body:new URLSearchParams(params)
    };
    if (this._headers !== undefined) {
      options.headers = this._headers;
    }
    return fetch(datafeedUrl + "/" + urlPath, options)
      .then(function (response) {
        return response.text();
      })
      .then(function (responseTest) {
        return JSON.parse(responseTest);
      });
  };
  return Requester;
}());
export {Requester};
