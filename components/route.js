import {hasValue} from './common';

export function serializeParams(params) {
    let str = '';
    for (let p in params) {
        if (params.hasOwnProperty(p)) {
            str += '&' + p + '=' + params[p];
        }
    }
    return str.replace(/^&/, '');
}

// 获取url中查询参数的值
export const getKeyFromUrl = key => {
    const reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)')
    const r = window.location.href.match(reg)
    return r ? window.decodeURI(r[2]).replace(/#.*$/, '') : ''
}

// 获取url中查询参数的值
export const getKeyFromSearch = key => {
    const reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)')
    const r = window.location.search.match(reg)
    return r ? window.decodeURI(r[2]).replace(/#.*$/, '') : ''
}

// 获取url地址中参数的值
export const getKeyFromhash = key => {
    const reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)')
    const r = window.location.hash.match(reg)
    return r ? window.decodeURI(r[2]).replace(/#.*$/, '') : ''
}

export const getKeyFromString = (string, key) => {
    const reg = new RegExp('(\\?|&)' + key + '=([^&]*)(&|$)')
    const r = string.match(reg)
    return r ? r[2].replace(/#.*$/, '') : ''
}

// 获取当前路由对象的属性 vue
export function getRoute() {
    return {
        path: location.pathname.replace(/^.*(\/[a-z-]+)\.html/, '$1'),
        query: getQueryObj()
    };
}
