function getCSS (o, key) {
  return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
}

export function startDrag (bar, target, callback) {
  const params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
  };

  bar.onmousedown = (e) => {
    params.flag = true;
    if (!e) {
      e = window.event;
      // 防止IE文字选中
      bar.onselectstart = () => false;
    }
    params.currentX = e.clientX;
    params.currentY = e.clientY;
    if (getCSS(target, 'left') !== 'auto') {
      params.left = getCSS(target, 'left');
    }
    if (getCSS(target, 'top') !== 'auto') {
      params.top = getCSS(target, 'top');
    }
  };

  document.onmouseup = () => {
    params.flag = false;
    if (getCSS(target, 'left') !== 'auto') {
      params.left = getCSS(target, 'left');
    }
    if (getCSS(target, 'top') !== 'auto') {
      params.top = getCSS(target, 'top');
    }
  };

  document.onmousemove = (e) => {
    e = e || window.event;
    if (params.flag === true) {
      const nowX = e.clientX;
      const nowY = e.clientY;
      const disX = nowX - params.currentX;
      const disY = nowY - params.currentY;
      target.style.left = parseInt(params.left, 10) + disX + 'px';
      target.style.top = parseInt(params.top, 10) + disY + 'px';

      if (typeof callback === 'function') {
        const px = (parseInt(params.left, 10) || 0) + disX;
        const py = (parseInt(params.top) || 0) + disY;
        callback(px, py);
      }

      e.preventDefault && e.preventDefault();

      return false;
    }
  };
}
