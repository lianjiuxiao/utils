export function getString (val) {
  return val === 0 ? '0' : (val ? '' + val : '');
}

// 移除文本中的空白
export function trimSpaces (val) {
  return ('' + val).replace(/\s/g, '');
}
