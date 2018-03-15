/**
 * 判断一个数组元素是不是在数组里面
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function(obj) {
    var i = this.length;
    while(i--) {
        if(this[i] === obj) {
            return true;
        }
    }
    return false;
};
/**
 * 获取数组最大的值
 * @returns {number}
 */
Array.prototype.arrayMax = function() {
    return Math.max.apply(null, this);
};
/**
 * 获取数组中最小的值
 * @returns {number}
 */
Array.prototype.arrayMin = function() {
    return Math.min.apply(null, this);
};
/**
 * 过滤数组中重复的，如果是数组对象就传递一个参数进去
 * dataSet.uniqueFn("id"),那么就是根据id过滤数组对象
 **/
Array.prototype.uniqueFn = function(key) {
    var arr = this;
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] == n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
};

/*each和map的功能是一样的*/
export function each(arr, fn) {
    fn = fn || Function;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < arr.length; i++) {
        var res = fn.apply(arr, [arr[i], i].concat(args));
        if (res != null) a.push(res);
    }
    return a;
}

export function map(arr, fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for (var i = 0, j = arr.length; i < j; ++i) {
        var res = fn.call(scope, arr[i], i, this);
        if (res != null) a.push(res);
    }
    return a;
}

/**
 * 数组的排序
 * @param array
 * @param sortFlag
 * @returns {*}
 */
export function orderBy(array, sortFlag) {
    var $arr = array;
    if (sortFlag == 'asc') {
        $arr.sort(this._numAscSort);
    } else if (sortFlag == 'desc') {
        $arr.sort(this._numDescSort);
    } else {
        $arr.sort(this._numAscSort);
    }
    return $arr;
}

// 求两个集合的并集
export function union(a, b) {
    var newArr = a.concat(b);
    return this.unique2(newArr);
}

// 求两个集合的补集
export function complement(a, b) {
    return this.minus(this.union(a, b), this.intersect(a, b));
}

// 求两个集合的交集
export function intersect(a, b) {
    a = this.unique(a);
    return this.each(a, function (o) {
        return b.contains(o) ? o : null;
    });
}

//求两个集合的差集
export function minus(a, b) {
    a = this.unique(a);
    return this.each(a, function (o) {
        return b.contains(o) ? null : o;
    });
}

/**
 * 数组的去重
 * @param arr
 * @returns {Array}
 */
export function unique(arr) {
    var ra = new Array();
    for (var i = 0; i < arr.length; i++) {
        if (!ra.contains(arr[i])) {
            //if(this.contains(ra,arr[i])){
            ra.push(arr[i]);
        }
    }
    return ra;
}

/**
 * 数组的去重复
 * @param arr
 * @returns {*}
 */
export function unique2(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length;) {
            if (arr[j] == arr[i]) {
                arr.splice(j, 1);
            } else {
                j++;
            }
        }
    }
    return arr;
}

/**
 * 数组去除重复的(根据对象来)
 * @param {Object} ary
 */
export function unique3(ary) {
    var result = [],
        hash = {};
    for (var i = 0, elem;
         (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

/**
 * 获取数组的下标
 * @param arr
 * @param val
 * @returns {number}
 */
export function indexOf(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
    return -1;
}

/**
 * 判断一个元素是否在一个数组中
 * @param arr
 * @param val
 * @returns {boolean}
 */
export function contains(arr, val) {
    return this.indexOf(arr, val) != -1 ? true : false;
}

/**
 * 数组中删除一个元素
 * @param arr
 * @param indexs
 * @returns {*}
 */
export function remove(arr, indexs) {
    var index = this.indexOf(arr, indexs);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export function removeObject(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        var jsonData = arr[i];
        for (var key in jsonData) {
            if (jsonData[key] == item) {
                arr.splice(i, 1);
            }
        }
    }
    return arr;
}

/**
 * 求数组中最大值
 * @param arr
 * @returns {number|Number}
 */
export function arrMax(arr) {
    return Math.max.apply(null, arr);
}

/**
 * 求数组中最小值
 * @param arr
 * @returns {number|Number}
 */
export function arrMin(arr) {
    return Math.min.apply(null, arr);
}

/**
 * 删除数组元素的方法
 */
export function removeAry(ary, ele) {
    ary.splice(ary.indexOf(ele), 1);
}

/**
 * 将类数组转换为数组的方法
 * @param ary
 * @returns {Array}
 */
export function formArray(ary) {
    var arr = [];
    if (Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    }
    return arr;
}

/**
 * 定义一个数组排序的方法
 * 默认为升序排序asc,
 * 如果传递是参数是一个的话，那么就是是升序，如果传递的参数是两个的话，如果第一个参数不能转换为数组的话，也直接退出
 * 参数:acs:表示升序
 * 参数:desc:表示降序
 * @returns {*}
 */
export function arrySort() {
    var arg = arguments;
    var len = arg.length;
    var ary = this.arryList(arg[0]);
    //如果没传递参数，或者传递的不能转换为数组的话就直接返回
    if (!len || Array.isArray(ary) == false) {
        return false;
    }
    if (len == 1) {
        return ary.sort(function (a, b) {
            return a - b;
        });
    } else {
        return ary.sort(function (a, b) {
            if (arg[1] == "desc") {
                return b - a;
            } else if (arg[1] == "asc") {
                return a - b;
            } else {
                return a - b;
            }
            ;
        });
    }
}

/**
 * 求和函数
 * @param arr
 * @returns {number}
 */
export function arySum(arr) {
    var ary = [];
    var result = 0;
    if (arr instanceof Array) {
        ary = arr;
    } else {
        ary = this.formArray(arr);
    }
    for (var i = 0; i < ary.length; i++) {
        result += parseFloat(ary[i]);
    }
    return result;
}

/**
 * 数组随机排列
 * @param {Object} ary
 */
export function shuffle(ary) {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}

/**
 * 数组随机排序
 * @param {Object} target
 */
export function shuffle1(target) {
    function randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1;
        //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }

    return target.sort(randomsort);
}

/**
 * 判断是不是数组
 * @param {Object} ary
 */
export function isArray(ary) {
    var objectToStringFn = Object.prototype.toString;
    var arrayToStringResult = objectToStringFn.call([]);
    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
}

/**
 * 随机返回数组中一个元素
 * @param {Object} ary
 */
export function randomItem(ary) {
    return ary[Math.ceil(Math.random() * ary.length)];
}

/**
 * 判断数组中是否包含某一项
 * @param arr
 * @returns {number|Number}
 * 调用方法：var max = utils.arrContains([],"",false)  flag 如果为true，则判断字符串    false则判断字符
 */
export function arrContains(arr, str, flag) {
    if (flag) {
        if (arr.length > 0 && this.isNotEmpty(str)) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == str) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr[i].length; j++) {
                if (arr[i].charAt(j) == str) {
                    return true;
                } else {
                    false;
                }
            }
        }
    }
}

/**
 * 判断数组是否有重复的项
 * @param {Object} arr
 */
export function isRepeat(arr) { //arr是否有重复元素
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
    }
    return false;
}

export function _numAscSort(a, b) {
    return a - b;
}

export function _numDescSort(a, b) {
    return b - a;
}

export function _sortAsc(x, y) {
    if (x > y) {
        return 1;
    } else {
        return -1;
    }
}

export function _sortDesc(x, y) {
    if (x > y) {
        return -1;
    } else {
        return 1;
    }
}

