// 日期格式化工具
import { format } from 'date-fns'

/**
 * 日期格式化
 */
 const dateFormattingTTime = (date) => {
  return date ? format(new Date(date), 'yyyy-MM-dd hh:mm:ss') : ''
}
const dateFormattingSlashTime = (date) => {
  return date ? format(new Date(date), 'yyyy/MM/dd hh:mm:ss') : ''
}
const dateFormattingYmdDotTime = (date) => {
  return date ? format(new Date(date), 'yyyy.MM.dd hh:mm:ss') : ''
}
const dateFormattingYmd = (date) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : ''
}
const dateFormattingYmdDot = (date) => {
  return date ? format(new Date(date), 'yyyy.MM.dd') : ''
}
const dateFormattingSlash = (date) => {
  return date ? format(new Date(date), 'yyyy/MM/dd') : ''
}
const dateFormattingTime = (date) => {
  return date ? format(new Date(date), 'hh:mm:ss') : ''
}

/**
 * 时间格式化
 */
const dateFormatting = (date) => {
  return date ? format(new Date(date), 'yyyy-MM-dd HH:mm:ss') : ''
}

export {
  dateFormattingTTime,
  dateFormattingSlashTime,
  dateFormattingYmdDotTime,
  dateFormattingYmd,
  dateFormattingTime,
  dateFormattingYmdDot,
  dateFormattingSlash,
  dateFormatting
}


/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}