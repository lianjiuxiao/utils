/**
 * 文件大小转换为MB GB KB格式
 * @param {Object} size
 */
export function countFileSize(size) {
    var fsize = parseFloat(size, 2);
    var fileSizeString;
    if (fsize < 1024) {
        fileSizeString = fsize.toFixed(2) + "B";
    } else if (fsize < 1048576) {
        fileSizeString = (fsize / 1024).toFixed(2) + "KB";
    } else if (fsize < 1073741824) {
        fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
    } else if (fsize < 1024 * 1024 * 1024) {
        fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
    } else {
        fileSizeString = "0B";
    }
    return fileSizeString;
}

/**
 * 获取文件的后缀名
 * @param {Object} fileName
 */
export function getExt(fileName) {
    if (fileName.lastIndexOf(".") == -1)
        return fileName;
    var pos = fileName.lastIndexOf(".") + 1;
    return fileName.substring(pos, fileName.length).toLowerCase();
}

/**
 * 获取文件名称
 * @param {Object} fileName
 */
export function getFileName(fileName) {
    var pos = fileName.lastIndexOf(".");
    if (pos == -1) {
        return fileName;
    } else {
        return fileName.substring(pos, fileName.length);
    }
}

/**
 * 过滤html代码(把<>转换)
 * @param {Object} str
 */
export function filterTag(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
}

/**
 * 过滤<script></script>转换
 * @param {Object} str
 */
export function filterScript(str) {
    return str.replace(/(<script)/ig, "&lt;script").replace(/(<script>)/ig, "&lt;script&gt;").replace(/(<\/script>)/ig, "&lt;/script&gt;");
}

/**
 * 判断非空
 * @param val
 * @returns {Boolean}
 */
export function isEmpty(val) {
    val = $.trim(val);
    if (val == null)
        return true;
    if (val == undefined || val == 'undefined')
        return true;
    if (val == "")
        return true;
    if (val.length == 0)
        return true;
    if (!/[^(^\s*)|(\s*$)]/.test(val))
        return true;
    return false;
}

/**
 * 判断一个非空
 * @param {Object} val
 */
export function isNotEmpty(val) {
    return !isEmpty(val);
}

/*验证是否为图片*/
export function CheckImage(fileName) {
    return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
}

/*验证是否为视频*/
export function CheckVideo(fileName) {
    return /(mp4|mp3|flv|wav)$/ig.test(fileName);
}

/*验证是否为文档*/
export function CheckDocument(fileName) {
    return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|h|shtml|xml)$/ig.test(fileName);
}

/*验证是否为文档*/
export function CheckOffice(fileName) {
    return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(fileName);
}

/**
 * 去除字符串两边的空格
 * @param str
 * @returns {number|Number}
 * 调用方法：var str = utils.trim("abcd")
 */
export function trim(str) {
    String.prototype.trim = function () {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

/**
 * 判断字符串是否是汉字，字段中有空格返回false
 * @param obj
 * @returns {number|Number}
 */
export function isChinese(str) {
    if (/^([\u4e00-\u9fa5]|[\ufe30-\uffA0])*$/.test(this.trim(str)))
        return true;
}