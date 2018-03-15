import 'babel-polyfill';
import $ from 'jQuery'
import moment from 'moment'
import * as ajax from './ajax';
import * as array from './array';
import * as file from './file';
import * as common from './common';
import * as device from './device';
import * as hook from './hook';
import * as modal from './modal';
import * as number from './number';
import * as object from './object';
import * as route from './route';
import * as storage from './storage';
import * as string from './string';
import * as regRule from './regRule';

const utils = {
    //ajax,
    array,
    file,
    common,
    device,
    hook,
    modal,
    number,
    object,
    route,
    // storage,
    // string,
    regRule,
};

export default utils;


window.$ = $
window.jQuery = $
window.moment=moment

// 挂载到window对象上，页面里可以直接通过访问$utils调用相关方法
window.utils = utils;
