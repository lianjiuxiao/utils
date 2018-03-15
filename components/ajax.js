import { merge } from './object';
import { load as modalLoad, alert as modalAlert, getLoadStatus } from './modal';
import { getSessionData } from './storage';

let apiPrefix = '/';
let apiSuffix = '.do';
let countForAjaxWait = 0;

export function setApiPrefix (val) {
  apiPrefix = val;
}



export function setApiSuffix (val) {
  apiSuffix = val;
}

export function post (endPoint, requestData, options, config) {
  requestData = requestData || {};
  config = config || { handleErrorAutomatically: true, silent: false };
  const handleErrorAutomatically = config.handleErrorAutomatically || false;
  const silent = config.silent || false;
  if (!silent) {
    countForAjaxWait++;
    if (countForAjaxWait === 1 && getLoadStatus() === false) {
      modalLoad(true);
    }
  }
  return $.ajax(merge({
    type: 'POST',
    accept: 'application/json',
    // contentType: requestData instanceof FormData ? false : 'application/json',
    // contentType: requestData instanceof FormData ? false : 'application/json;charset=utf-8',
    contentType: requestData instanceof FormData ? false : 'application/x-www-form-urlencoded;charset=utf-8',
    url: apiPrefix + (endPoint || '') + apiSuffix,
    dataType: 'json',
    processData: !(requestData instanceof FormData),
    headers: {
      token: getSessionData('user').token,
      userid: getSessionData('user').userId,
      username: getSessionData('user').userName
    },
    data: (function () {
      if (requestData instanceof FormData) {
        return requestData;
      }
      return requestData;
      // return JSON.stringify(requestData);
    })()
  }, options || {})).done(function (data) {
    if (data.code === '10000') {
      //
    } else if (data.code === '10002') {
      handleErrorAutomatically && modalAlert({
        content: data.msg || '未登录或操作会话已过期，请重新登录！',
        callback () {
          $utils.route.go({
            path: '/login',
            query: {
              redirect: $utils.route.getRoute().path
            }
          });
        }
      });
    } else {
      handleErrorAutomatically && modalAlert({ content: data.msg || '服务器响应异常！' });
    }
  }).fail(function () {
    handleErrorAutomatically && modalAlert({ content: '网络异常，请稍后再试！' });
  }).always(function () {
    if (!silent) {
      countForAjaxWait--;
      if (countForAjaxWait === 0 && getLoadStatus() === true) {
        modalLoad(false);
      }
    }
  });
}

export function get (endPoint, requestData, options, config) {
  requestData = requestData || {};
  config = config || { handleErrorAutomatically: true, silent: false };
  const handleErrorAutomatically = config.handleErrorAutomatically || false;
  const silent = config.silent || false;
  if (!silent) {
    countForAjaxWait++;
    if (countForAjaxWait === 1 && getLoadStatus() === false) {
      modalLoad(true);
    }
  }
  return $.ajax(merge({
    type: 'GET',
    accept: 'application/json',
    // contentType: requestData instanceof FormData ? false : 'application/json',
    // contentType: requestData instanceof FormData ? false : 'application/json;charset=utf-8',
    contentType: requestData instanceof FormData ? false : 'application/x-www-form-urlencoded;charset=utf-8',
    url: apiPrefix + (endPoint || '') + apiSuffix,
    dataType: 'json',
    processData: !(requestData instanceof FormData),
    headers: {
      token: getSessionData('user').token,
      userid: getSessionData('user').userId,
      username: getSessionData('user').userName
    },
    data: (function () {
      if (requestData instanceof FormData) {
        return requestData;
      }
      return requestData;
      // return JSON.stringify(requestData);
    })()
  }, options || {})).done(function (data) {
    if (data.code === '10000') {
      //
    } else if (data.code === '10002') {
      handleErrorAutomatically && modalAlert({
        content: data.msg || '未登录或操作会话已过期，请重新登录！',
        callback () {
          $utils.route.go({
            path: '/login',
            query: {
              redirect: $utils.route.getRoute().path
            }
          });
        }
      });
    } else {
      handleErrorAutomatically && modalAlert({ content: data.msg || '服务器响应异常！' });
    }
  }).fail(function () {
    handleErrorAutomatically && modalAlert({ content: '网络异常，请稍后再试！' });
  }).always(function () {
    if (!silent) {
      countForAjaxWait--;
      if (countForAjaxWait === 0 && getLoadStatus() === true) {
        modalLoad(false);
      }
    }
  });
}
