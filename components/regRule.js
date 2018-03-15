export function email(email) {
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return reg.test(email);
}
export function userName(str) {
    var reg = /^[a-z0-9_-]{3,16}$/; //用户名
    return reg.test(str);
}
export function chineseName(str) {
    var reg = /^[\u4E00-\u9FA5]{2,4}$/; //中文姓名
    return reg.test(str);
}
export function mobile(str) {
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/; //手机
    return reg.test(str);
}
export function tel(str) {
    var reg = /^0[\d]{2,3}-[\d]{7,8}$/; //固话
    return reg.test(str);
}
export function idCard(str) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
    return reg.test(str);
}
export function amount(str) {
    var reg = /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/; //金额(10位整数2位小数)
    return reg.test(str);
}
export function positiveInt(str) {
    var reg = /^[1-9]*[1-9][0-9]*$/; //正整数
    return reg.test(str);
}
export function int(str) {
    var reg = /^-?\d+$/; //整数(不限位数)
    return reg.test(str);
}
export function bankCard(str) {
    var reg = /^\d{16}|\d{19}$/; //16位或19位银行卡或信用卡号(先把空格replace为空串)
    return reg.test(str);
}
export function chinese(str) {
    var reg = /[\u4e00-\u9fa5]/g; //判断是不是中文
    return reg.test(str);
}
export function noChinese(str) {
    var reg = /[^\u4e00-\u9fa5]/g; //判断不是中文
    return reg.test(str);
}
export function decimalNumber(str) {
    var reg = /^\d+(\.\d+)+$/; //判断带小数的数字
    return reg.test(new Number(str));
}
export function ip(str) {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    return reg.test(str);
}
