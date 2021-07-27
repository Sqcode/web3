
// 深拷贝
// const clone = (obj) => {
//   let o = Array.isArray(obj)?[]:{};
//   if(obj && typeof obj==="object"){
//       for(key in obj){
//           if(obj.hasOwnProperty(key)){
//               //判断ojb子元素是否为对象，如果是，递归复制
//               if(obj[key]&&typeof obj[key] ==="object"){
//                   o[key] = deepClone(obj[key]);
//               }else{
//                   //如果不是，简单复制
//                   o[key] = obj[key];
//               }
//           }
//       }
//   }
//   return o;
// };
export function absoluteUrl (url) {
  if (url.indexOf(',') != -1) {
    return '';
  }
  return process.env.VUE_APP_IMAGE_URL_PREFIX + url
}

export function clone (obj) {
  const _obj = JSON.stringify(obj)
  const o = JSON.parse(_obj)
  return o
}

export default {
  clone,
  format,
  isEqual,
  absoluteUrl
}

export function format (date, formatter) {
  if (typeof (date) === 'undefined' || date == null || date == '') {
    return ''
  }

  try {
    date = new Date(date)
  } catch (e) {
    console.log('时间 ' + date + ' 格式化失败！')
    return ''
  }

  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }

  if (/(y+)/.test(formatter)) {
    formatter = formatter
      .replace(RegExp.$1, (date.getFullYear() + '')
        .substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(formatter)) {
      formatter = formatter.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return formatter
};
// 判断两个对象是否相等
export function isEqual (objA, objB) {
  // 相等
  if (objA === objB) return objA !== 0 || 1 / objA === 1 / objB
  // 空判断
  if (objA == null || objB == null) return objA === objB
  // 类型判断
  if (Object.prototype.toString.call(objA) !== Object.prototype.toString.call(objB)) return false

  switch (Object.prototype.toString.call(objA)) {
    case '[object RegExp]':
    case '[object String]':
      // 字符串转换比较
      return '' + objA === '' + objB
    case '[object Number]':
      // 数字转换比较,判断是否为NaN
      if (+objA !== +objA) {
        return +objB !== +objB
      }

      return +objA === 0 ? 1 / +objA === 1 / objB : +objA === +objB
    case '[object Date]':
    case '[object Boolean]':
      return +objA === +objB
    case '[object Array]':
      // 判断数组
      for (let i = 0; i < objA.length; i++) {
        if (!this.isEqual(objA[i], objB[i])) return false
      }
      return true
    case '[object Object]':
      // 判断对象
      let keys = Object.keys(objA)
      for (let i = 0; i < keys.length; i++) {
        if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false
      }

      keys = Object.keys(objB)
      for (let i = 0; i < keys.length; i++) {
        if (!this.isEqual(objA[keys[i]], objB[keys[i]])) return false
      }

      return true
    default :
      return false
  }
}
