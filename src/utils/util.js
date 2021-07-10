
// 深拷贝
const clone = (obj) => {
  let o = Array.isArray(obj)?[]:{};
  if(obj && typeof obj==="object"){
      for(key in obj){
          if(obj.hasOwnProperty(key)){
              //判断ojb子元素是否为对象，如果是，递归复制
              if(obj[key]&&typeof obj[key] ==="object"){
                  o[key] = deepClone(obj[key]);
              }else{
                  //如果不是，简单复制
                  o[key] = obj[key];
              }
          }
      }
  }
  return o;
};

const json_clone = (obj) => {
  let _obj = JSON.stringify(obj),
  o = JSON.parse(_obj);
  return o
}

export default {
  clone,
  json_clone
};
