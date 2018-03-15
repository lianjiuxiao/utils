// typeOf, return 'array', 'object', 'function', 'null', 'undefined', 'string', 'number'
export function typeOf (input) {
  return ({}).toString.call(input).slice(8, -1).toLowerCase();
}

// 判断是否有值：全部都是空格或其他诸如tab的话，也作为无值看待
export function hasValue (val) {
  return val !== '' && val !== null && val !== undefined && !/^\s+$/.test(val);
}

export function getHashParameter (key) {
  const params = getHashParameters();
  return params[key];
}
export function getHashParameters () {
  const arr = (location.hash || '').replace(/^#/, '').split('&');
  const params = {};
  for (let i = 0; i < arr.length; i++) {
    const data = arr[i].split('=');
    if (data.length === 2) {
      params[data[0]] = data[1];
    }
  }
  return params;
}