/**
 * 本代码基于http://www.lanrenzhijia.com/js/4651.html网页上的这个SimpleCalendar.js插件改写而成，感谢原作者
 */
class LunarHelp {
  constructor (year, month, day) {
    this.lunarInfo = [
      0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
      0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
      0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
      0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
      0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
      0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ];

    this.nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    this.nStr2 = ['初', '十', '廿', '三'];

    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    let i;
    let leap = 0;
    // 天数
    let temp = 0;
    const baseDate = new Date(1900, 0, 31);
    // 计算今天离1900年1月31日差多少天（一天有86400000ms）
    let offset = (date - baseDate) / 86400000;

    // 计算年数
    for (i = 1900; i < 2050 && (offset - this.lYearDays(i)) > 0; i++) {
      offset -= this.lYearDays(i);
    }

    this.year = i;
    // 闰哪个月
    leap = this.leapMonth(i);
    this.isLeap = false;

    // 计算月数
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i === (leap + 1) && this.isLeap === false) {
        --i;
        temp = this.leapDays(this.year);
      } else {
        temp = this.monthDays(this.year, i);
      }

      // 解除闰月
      if (this.isLeap === true && i === (leap + 1)) {
        this.isLeap = false;
      }
      offset -= temp;
    }

    // 如果恰好减完了，不是闰月的话月数减1
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (this.isLeap) {
        this.isLeap = false;
      } else {
        this.isLeap = true;
        --i;
      }
    }

    if (offset < 0) {
      offset += temp;
      --i;
    }

    this.month = i;
    // 最后剩余的就是日期
    this.day = offset + 1;
  }

  // 获取y年的总天数
  lYearDays (year) {
    let i;
    let sum = 0;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (this.lunarInfo[year - 1900] & i) ? 30 : 29;
    }
    // 最后在加上可能有的闰年的闰月
    return (sum + this.leapDays(year));
  }

  // 获取闰年闰月的天数 闰大月还是小月
  leapDays (year) {
    if (this.leapMonth(year)) {
      return ((this.lunarInfo[year - 1900] & 0x10000) ? 30 : 29);
    } else {
      return 0;
    }
  }

  // 获取闰年闰哪个月1-12,没闰传回0
  leapMonth (year) {
    return (this.lunarInfo[year - 1900] & 0xf);
  }

  // 获取y年m月的总天数 正常月
  monthDays (year, month) {
    return ((this.lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
  }

  // 中文日期
  cDay (d) {
    switch (d) {
      case 10: return '初十';
      case 20: return '二十';
      case 30: return '三十';
      default:
        let s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
        return s;
    }
  }

  // 中文月份
  cMonth (m) {
    switch (m) {
      case 1: return '正月';
      case 2: return '二月';
      case 3: return '三月';
      case 4: return '四月';
      case 5: return '五月';
      case 6: return '六月';
      case 7: return '七月';
      case 8: return '八月';
      case 9: return '九月';
      case 10: return '十月';
      case 11: return '十一月';
      case 12: return '十二月';
      default: break;
    }
  }

  // 获得阴历日期某一天的中文
  getLunarDayName () {
    return this.day === 1 ? this.cMonth(this.month) : this.cDay(this.day);
  }

  // 获取阴历日期的数字
  getLunarDayNum () {
    return {
      day: this.day,
      month: this.month
    };
  }
}

class SimpleCalendar {
  // 构造函数
  constructor (query, options) {
    // 默认配置
    this._defaultOptions = {
      width: '500px',
      height: '500px',
      // 语言
      language: 'CH',
      // 阴历
      showLunarCalendar: true,
      // 休假
      showHoliday: true,
      // 节日
      showFestival: true,
      // 农历节日
      showLunarFestival: true,
      // 节气
      showSolarTerm: true,
      // 标记
      showMark: true,
      // 价格
      showPrice: true,
      timeRange: {
        startYear: 1900,
        endYear: 2049
      },
      // 时区
      timeZone: '',
      // TODO: 脏数据？
      // mark: {
      //   '2016-5-5': '上学'
      // },
      theme: {
        changeAble: false,
        weeks: {
          backgroundColor: '#FBEC9C',
          fontColor: '#4A4A4A',
          fontSize: '20px'
        },
        days: {
          backgroundColor: '#ffffff',
          fontColor: '#565555',
          fontSize: '24px'
        },
        todaycolor: 'orange',
        activeSelectColor: 'orange',
        invalidDays: '#C1C0C0'
      }
    };

    // 容器
    this.container = document.querySelector(query);

    if (this.container === null) {
      throw new Error(`document.querySelector(${query}) doesn't match an effective element.`);
    }

    this._defaultOptions.width = this.container.style.offsetWidth;
    this._defaultOptions.height = this.container.style.offsetHeight;

    // 得到最终配置
    this._options = this.optionAssign(this._defaultOptions, options);

    this.create();
  }

  toDouble (num) {
    num = parseInt(num, 10);
    return num < 10 ? ('0' + num) : ('' + num);
  }

  // 用B更新A的属性，并返回结果
  optionAssign (optionsA, optionsB) {
    for (let key in optionsB) {
      if (optionsB.hasOwnProperty(key)) {
        if (typeof optionsA[key] !== 'object') {
          optionsA[key] = optionsB[key];
        } else {
          optionsA[key] = this.optionAssign(optionsA[key], optionsB[key]);
        }
      }
    }
    return optionsA;
  }

  // 生成日历样式
  create () {
    const root = this.container;
    root.innerHTML = `
      <div class="sc-header"></div>
      <div class="sc-body"></div>
    `;
    root.style.width = this._options.width;
    root.style.height = this._options.height;
    root.classList.add('sc-calendar');
    const header = root.querySelector('.sc-header');
    const scbody = root.querySelector('.sc-body');
    // actions
    header.innerHTML = `
      <div class="sc-actions">
        <select class="sc-select sc-select-year" name=""></select>
        <div class="sc-select-label">年</div>
      </div>
      <div class="sc-actions">
        <select class="sc-select sc-select-month" name=""></select>
        <div class="sc-select-label">月</div>
      </div>
    `;
    scbody.innerHTML = `
      <div class="sc-week"></div>
      <div class="sc-days"></div>
    `;
    const week = scbody.querySelector('.sc-week');
    const days = scbody.querySelector('.sc-days');
    for (let i = 0; i < 7; i++) {
      week.innerHTML += '<div class="sc-week-item"></div>';
    }
    for (let i = 0; i < 35; i++) {
      days.innerHTML += `
        <div class="sc-item">
          <div class="day"></div>
          <div class="festival"></div>
          <div class="price"></div>
          <div class="mark"></div>
        </div>
      `;
    }
    // 添加下拉框数据
    this.updateSelect(this.tyear, this.tmonth);
    // 刷新日历
    this.update();
    // 绑定一次事件
    this.updateEvent();
    // 时间刷新
    // self.setInterval('SimpleCalendar.timeupdate()', 200);
  }

  // 刷新日历
  update (month = this.tmonth, year = this.tyear) {
    this.updateSize();
    this.updateWeek();
    this.addData(year, month);
    this.updateHoliday(year, month);
    this.updateMark(year, month);
    this.updatePrice(year, month);
    this.updateFestival(year, month);
    // this.updateEvent();
    this.updateTheme(this._options.theme);
  }

  // 调整大小
  updateSize (width = this._options.width, height = this._options.height) {
    // 将大小赋值给option
    this._options.width = width;
    this._options.height = height;

    this.container.style.width = width;
    this.container.style.height = height;

    // 根据长度和宽度大小调整适合的样式
    // if (parseInt(width) < 392) {
    //   const actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
    //   actions.forEach((item, idx) => {
    //     item.classList.add('sc-actions-big');
    //   });
    // } else {
    //   const actions = this.arrayfrom(this.container.querySelectorAll('.sc-actions'));
    //   actions.forEach((item, idx) => {
    //     item.classList.remove('sc-actions-big');
    //   });
    // }
    // if (parseInt(height) < 400) {
    //   const items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
    //   const weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
    //   items.forEach((item, idx) => {
    //     item.querySelector('.day').classList.add('sc-item-small');
    //   });
    //   weeks.forEach((item, idx) => {
    //     item.classList.add('sc-item-small');
    //   });
    // } else {
    //   const items = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
    //   const weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
    //   items.forEach((item, idx) => {
    //     item.querySelector('.day').classList.remove('sc-item-small');
    //   });
    //   weeks.forEach((item, idx) => {
    //     item.classList.remove('sc-item-small');
    //   });
    // }
  }

  // 刷新下拉框 只有在初始化和设置语言后才会更新
  updateSelect (year, month) {
    // 下拉框
    const selectYear = this.container.querySelector('.sc-select-year');
    const selectMonth = this.container.querySelector('.sc-select-month');
    selectYear.innerHTML = '';
    for (let i = this._options.timeRange.startYear; i < this._options.timeRange.endYear + 1; i++) {
      selectYear.innerHTML += `<option value="${i}">${i}</option>`;
    }
    selectMonth.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const data = this.languageData['months_' + this._options.language];
      selectMonth.innerHTML += `<option value="${i + 1}">${data[i]}</option>`;
    }

    selectYear.value = year;
    selectMonth.value = month;
  }

  // 刷新星期
  updateWeek () {
    const weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
    const data = this.languageData['days_' + this._options.language];
    if (!data) {
      console.error('language error!');
    }
    weeks.forEach((item, idx) => {
      item.innerHTML = data[idx];
    });
  }

  // 添加阳历阴历数据
  addData (year, month) {
    const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
    const toDouble = this.toDouble;
    const day = new Date(year, month - 1, 1);
    // 若week为0，则week为7
    let week = day.getDay() || 7;

    // 计算得到第一个格子的日期
    const thispageStart = new Date(Date.parse(day) - (week - 1) * 24 * 3600 * 1000);

    // 对每一个格子遍历
    for (let i = 0; i < 35; i++) {
      daysElement[i].className = 'sc-item';
      const theday = new Date(Date.parse(thispageStart) + i * 24 * 3600 * 1000);
      const writeyear = theday.getFullYear();
      const writeday = theday.getDate();
      const writemonth = theday.getMonth() + 1;
      daysElement[i].dataset.date = `${writeyear}-${toDouble(writemonth)}-${toDouble(writeday)}`;
      if (writemonth < month) {
        daysElement[i].classList.add('sc-prev-month');
      } else if (writemonth > month) {
        daysElement[i].classList.add('sc-next-month');
      }
      daysElement[i].querySelector('.day').innerHTML = writeday;
      // 判断是否添加阴历
      if (this._options.showLunarCalendar) {
        daysElement[i].querySelector('.festival').innerHTML = (new LunarHelp(writeyear, writemonth, writeday)).getLunarDayName();
      } else {
        daysElement[i].querySelector('.festival').innerHTML = '';
        daysElement[i].classList.add('item-nolunar');
      }

      // 添加today样式
      if (this.tyear === writeyear && this.tday === writeday && this.tmonth === writemonth) {
        this.selectDay = daysElement[i];
        daysElement[i].classList.add('sc-today');
      }
    }
  }

  // 刷新标记日期
  updateMark (year, month) {
    const options = this._options;
    if (options.showMark) {
      const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
      let currentmonth = month - 1;
      // 取得节日数据
      const data = options.mark;
      if (data) {
        daysElement.forEach((item, idx) => {
          const day = +(item.querySelector('.day').innerHTML);
          if (day === 1) {
            currentmonth++;
          }
          const mark = data[`${year}-${currentmonth}-${day}`];
          if (mark) {
            item.classList.add('sc-mark');
            item.querySelector('.mark').innerHTML = mark;
            item.title = data[year + '-' + currentmonth + '-' + day];
          } else {
            item.classList.remove('sc-mark');
            item.querySelector('.mark').innerHTML = '';
            item.title = '';
          }
        });
      }
    }
  }

  // 刷新节日数据
  updateFestival (year, month) {
    const options = this._options;
    const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
    let currentmonth = month - 1;
    // 取得节日数据
    const data = this.languageData['feativals_' + this._options.language];
    const lunardata = this.languageData['lunarFeatival_' + this._options.language];
    const solarTermdata = this.languageData['solarTerm'];
    if (!data) {
      console.error('language error!');
    }
    daysElement.forEach((item, idx) => {
      const day = +(item.querySelector('.day').innerHTML);
      if (day === 1) {
        currentmonth++;
      }
      const stringCurrentmonthDay = `${currentmonth}-${day}`;
      // 24节气
      if (options.showSolarTerm) {
        if (solarTermdata[stringCurrentmonthDay]) {
          item.querySelector('.festival').innerHTML = solarTermdata[stringCurrentmonthDay];
          item.classList.add('sc-festival');
        }
      }

      // 国际节日
      if (options.showFestival) {
        if (data[stringCurrentmonthDay]) {
          item.querySelector('.festival').innerHTML = data[stringCurrentmonthDay];
          item.classList.add('sc-festival');
        }
      }

      // 阴历节日
      if (lunardata && options.showLunarFestival) {
        const lunar = (new LunarHelp(year, currentmonth, day)).getLunarDayNum();
        if (lunardata[lunar.month + '-' + lunar.day]) {
          item.querySelector('.festival').innerHTML = lunardata[lunar.month + '-' + lunar.day];
          item.classList.add('sc-festival');
        }
      }
    });
  }

  // 刷新价格
  updatePrice (year, month) {
    const options = this._options;
    if (options.showPrice) {
      const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
      let currentmonth = month - 1;
      // 取得价格数据
      const data = options.price;
      if (data) {
        daysElement.forEach((item, idx) => {
          const day = +(item.querySelector('.day').innerHTML);
          if (day === 1) {
            currentmonth++;
          }
          const price = data[`${year}-${currentmonth}-${day}`];
          if (price) {
            item.classList.add('sc-has-price');
            item.querySelector('.price').innerHTML = price;
            item.title = data[year + '-' + currentmonth + '-' + day];
          } else {
            item.classList.remove('sc-has-price');
            item.querySelector('.price').innerHTML = '';
            item.title = '';
          }
        });
      }
    }
  }

  // 刷新假期 休假
  updateHoliday (year, month) {
    const options = this._options;
    if (options.showHoliday) {
      const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
      let currentmonth = month - 1;
      // 取得节日数据
      const data = this.languageData.vocation[`data_${year}`];
      if (data) {
        daysElement.forEach((item, idx) => {
          const day = +(item.querySelector('.day').innerHTML);
          if (day === 1) {
            currentmonth++;
          }
          // 国际节日
          if (data.indexOf(`${currentmonth}-${day}`) > 0) {
            item.classList.add('sc-vocation');
          }
        });
      }
    }
  }

  // 刷新主题
  updateTheme (theme) {
    if (this._options.theme.changeAble) {
      const daytheme = theme.days;
      const weektheme = theme.weeks;
      const weeks = this.arrayfrom(this.container.querySelectorAll('.sc-week-item'));
      const days = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
      weeks.forEach((item, idx) => {
        item.style.backgroundColor = weektheme.backgroundColor;
        item.style.fontSize = weektheme.fontSize;
        item.style.color = weektheme.fontColor;
      });
      days.forEach((item, idx) => {
        if (!item.classList.contains('sc-today')) {
          item.style.backgroundColor = daytheme.backgroundColor;
          item.querySelector('.day').style.color = daytheme.fontColor;
        } else {
          item.style.backgroundColor = theme.todaycolor;
        }
        item.querySelector('.day').style.fontSize = daytheme.fontSize;
      });
      // active border
      days.forEach((item, idx) => {
        item.addEventListener('mouseover', function (e) {
          this.style.borderColor = theme.activeSelectColor;
          this.style.borderWidth = '1px';
        }, false);
        item.addEventListener('mouseout', function (e) {
          this.style.borderColor = '#F1EBE4';
          this.style.borderWidth = '0 0 1px 1px';
        }, false);
      });
    }
  }

  // 刷新事件
  updateEvent () {
    const calendar = this;
    const container = calendar.container;
    const $container = $(container);
    $container.on('mouseover', '.sc-item', function (e) {
      this.classList.add('sc-active-day');
    }).on('mouseout', '.sc-item', function (e) {
      this.classList.remove('sc-active-day');
    }).on('click', '.sc-item', function (e) {
      const item = this;
      calendar.selectDay = item;
      const pre = container.querySelector('.sc-selected');
      if (pre) {
        pre.classList.remove('sc-selected');
      }
      this.classList.add('sc-selected');
      calendar._options.onDateClicked && calendar._options.onDateClicked(this);
    });

    $container.find('.sc-select-year').change(function (e) {
      const m = $container.find('.sc-select-month').val();
      const y = this.value;
      calendar.update(m, y);
      calendar._options.onYearChanged && calendar._options.onYearChanged(this);
    });

    $container.find('.sc-select-month').change(function (e) {
      const y = $container.find('.sc-select-year').val();
      const m = this.value;
      calendar.update(m, y);
      calendar._options.onMonthChanged && calendar._options.onMonthChanged(this);
    });

    // const daysElement = this.arrayfrom(this.container.querySelectorAll('.sc-item'));
    // const container = this.container;
    // const calendar = this;
    // function dayMouseoverCallback (e) {
    //   this.classList.add('sc-active-day');
    // }
    // function dayMouseoutCallback (e) {
    //   this.classList.remove('sc-active-day');
    // }
    // function dayClickedCallback (item, e) {
    //   calendar.selectDay = item;
    //   const pre = container.querySelector('.sc-selected');
    //   if (pre) {
    //     pre.classList.remove('sc-selected');
    //   }
    //   this.classList.add('sc-selected');
    //   calendar._options.onDateClicked && calendar._options.onDateClicked(this);
    // }
    // daysElement.forEach((item, idx) => {
    //   item.removeEventListener('mouseover', dayMouseoverCallback, false);
    //   item.removeEventListener('mouseout', dayMouseoutCallback, false);
    //   item.removeEventListener('click', dayClickedCallback.bind(item, item), false);
    //   item.addEventListener('mouseover', dayMouseoverCallback, false);
    //   item.addEventListener('mouseout', dayMouseoutCallback, false);
    //   item.addEventListener('click', dayClickedCallback.bind(item, item), false);
    // });

    // const selectYear = container.querySelector('.sc-select-year');
    // const selectMonth = container.querySelector('.sc-select-month');
    // function onYearChangedCallback (e) {
    //   const m = selectMonth.value;
    //   const y = this.value;
    //   calendar.update(m, y);
    //   calendar._options.onYearChanged && calendar._options.onYearChanged(this);
    // }
    // function onMonthChangedCallback (e) {
    //   const y = selectYear.value;
    //   const m = this.value;
    //   calendar.update(m, y);
    //   calendar._options.onMonthChanged && calendar._options.onMonthChanged(this);
    // }
    // selectYear.removeEventListener('change', onYearChangedCallback);
    // selectMonth.removeEventListener('change', onMonthChangedCallback);
    // selectYear.addEventListener('change', onYearChangedCallback, false);
    // selectMonth.addEventListener('change', onMonthChangedCallback, false);
  }

  // 添加标记(单个)
  addMark (day, info) {
    const year = day.split('-')[0];
    const month = parseInt(day.split('-')[1], 10);
    const date = parseInt(day.split('-')[2], 10);
    this._options.mark[`${year}-${month}-${date}`] = info;
    this.update();
  }

  // 添加标记（批量）
  addMarks (days, shouldUpdate) {
    const _this = this;
    days.forEach(item => {
      const day = item.day;
      const info = item.info;
      const year = day.split('-')[0];
      const month = parseInt(day.split('-')[1], 10);
      const date = parseInt(day.split('-')[2], 10);
      _this._options.mark[`${year}-${month}-${date}`] = info;
    });
    shouldUpdate && _this.update();
  }

  // 添加价格（单个）
  addPrice (day, info) {
    if (!this._options.price) {
      this._options.price = {};
    }
    const year = day.split('-')[0];
    const month = parseInt(day.split('-')[1], 10);
    const date = parseInt(day.split('-')[2], 10);
    this._options.price[`${year}-${month}-${date}`] = info;
    this.update();
  }

  // 添加价格（批量）
  addPrices (days, shouldUpdate) {
    const _this = this;
    if (!_this._options.price) {
      _this._options.price = {};
    }
    days.forEach(item => {
      const day = item.day;
      const info = item.info;
      const year = day.split('-')[0];
      const month = parseInt(day.split('-')[1], 10);
      const date = parseInt(day.split('-')[2], 10);
      _this._options.price[`${year}-${month}-${date}`] = info;
    });
    shouldUpdate && _this.update();
  }

  // 获取用户点击的日期
  getSelectedDay () {
    const selectYear = this.container.querySelector('.sc-select-year').value;
    const selectMonth = this.container.querySelector('.sc-select-month').value;
    const selectDay = this.selectDay.querySelector('.day').innerHTML;
    return new Date(selectYear, selectMonth - 1, selectDay);
  }

  // 设置语言
  setLenguage (language) {
    this._options.language = language;
    const selectYear = this.container.querySelector('.sc-select-year');
    const selectMonth = this.container.querySelector('.sc-select-month');
    this.updateSelect(selectYear.value, selectMonth.value);
    this.update();
  }

  // 设置是否显示节日
  showFestival (s) {
    this._options.showFestival = s;
    this.update();
  }

  // 设置是否显示假期
  showHoliday (s) {
    this._options.showHoliday = s;
    this.update();
  }

  // 设置是否显示节气
  showSolarTerm (s) {
    this._options.showSolarTerm = s;
    this.update();
  }

  // 设置是否显示阴历节日
  showLunarFestival (s) {
    this._options.showLunarFestival = s;
    this.update();
  }

  // 设置是否显示阴历日期
  showLunarCalendar (s) {
    this._options.showLunarCalendar = s;
    this.update();
  }

  // 设置是否显示标记日期
  showMark (s) {
    this._options.showMark = s;
    this.update();
  }

  // 设置是否显示价格
  showPrice (s) {
    this._options.showPrice = s;
    this.update();
  }

  // 将nodelist转数组
  arrayfrom (nodeList) {
    return ([]).slice.call(nodeList);
  }
}

// 时间刷新函数
SimpleCalendar.timeupdate = () => {
  const timespan = document.querySelectorAll('.sc-time');
  const now = new Date();
  let nh = now.getHours();
  let nm = now.getMinutes();
  let ns = now.getSeconds();
  if (nh < 10) {
    nh = '0' + nh;
  }
  if (nm < 10) {
    nm = '0' + nm;
  }
  if (ns < 10) {
    ns = '0' + ns;
  }
  ([]).forEach.call(timespan, (item) => {
    item.innerHTML = `时间：${nh}:${nm}:${ns}`;
  });
};

// 国际化，和一些节日数据，标记数据
SimpleCalendar.prototype.languageData = {
  feativals_CH: {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '3-12': '植树节',
    '4-1': '愚人节',
    '4-22': '地球日',
    '5-1': '劳动节',
    '5-4': '青年节',
    '6-1': '儿童节',
    '7-1': '建党节',
    '8-1': '建军节',
    '9-10': '教师节',
    '10-1': '国庆节',
    '12-25': '圣诞节'
  },
  feativals_EN: {
    '1-1': 'new year\'s day',
    '2-14': 'Saint Valentine\'s Day',
    '3-8': 'international women’s day',
    '3-12': 'Arbor Day',
    '4-1': 'April Fool\'s Day',
    '4-22': 'Earth Day',
    '5-1': 'international labour day',
    '5-4': 'Chinese Youth Day',
    '6-1': 'Children\'s Day',
    '7-1': 'The party\'s Day',
    '8-1': 'the Army\'s Day',
    '9-10': 'Teachers\' Day',
    '10-1': 'National Day',
    '12-25': 'Christmas Day'
  },
  lunarFeatival_CH: {
    '1-1': '春节',
    '2-2': '龙抬头',
    '1-15': '元宵节',
    '4-4': '寒食节',
    '4-5': '清明节',
    '5-5': '端午节',
    '8-15': '中秋节',
    '9-9': '重阳节',
    '12-30': '除夕'
  },
  // 节气，下面是是根据2018年的节日日期得出的，这个map可能每年都要更新一次
  solarTerm: {
    '2-4': '立春',
    '5-5': '立夏',
    '8-7': '立秋',
    '11-7': '立冬',
    '2-19': '雨水',
    '5-21': '小满',
    '8-23': '处暑',
    '11-22': '小雪',
    '3-5': '惊蛰',
    '6-6': '芒种',
    '9-8': '白露',
    '12-7': '大雪',
    '3-21': '春分',
    '6-21': '夏至',
    '9-23': '秋分',
    '12-22': '冬至',
    '4-5': '清明',
    '7-7': '小暑',
    '10-8': '寒露',
    '1-5': '小寒',
    '4-20': '谷雨',
    '7-23': '大暑',
    '10-23': '霜降',
    '1-20': '大寒'
  },
  days_EN: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  days_CH: ['一', '二', '三', '四', '五', '六', '日'],
  months_EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  months_CH: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  vocation: {
    data_2016: ['1-1', '1-2', '1-3', '2-7', '2-8', '2-9', '2-10', '2-11', '2-12', '2-13', '4-2', '4-3', '4-4', '4-30', '5-1', '5-2', '6-9', '6-10', '6-11', '9-15', '9-16', '9-17', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7']
  }
};

SimpleCalendar.prototype.tyear = (new Date()).getFullYear();
SimpleCalendar.prototype.tmonth = (new Date()).getMonth() + 1;
SimpleCalendar.prototype.tday = (new Date()).getDate();
