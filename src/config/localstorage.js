//读取本地存储中的数据
//为本地存储设置数据
//更新本地存储的数据
//删除本地存储的数据

//读取
export function getLocalData(){
  return JSON.parse(localStorage.getItem('shopcarList') || '[]')
  //因为本地存储的是字符串 需要进行转换 并且如果本地存储没有数据的时候需要传递一个空字数组
}

//设置
export function setLocalData(json){
  //将来传递的参数json里面必须要有id和count
  //先获取数据
  let data = getLocalData()
  //判断获取到的旧数据是否有json.id
  let hasData = false 
  data.forEach(item => {
    if(item.id == json.id){
      //说明有数据
      hasData = true
      item.count += json.count
    }
  })
  //如果没有数据(而不是两者的id不相同,注意)
  if(!hasData){
    data.push(json)
  }

  localStorage.setItem('shopcarList',JSON.stringify(data))
}
//更新
export function  updateLocalData(json) {
  //{id: , num: -1}
  let data = getLocalData()
  data.forEach(item=>{
    if(item.id == json.id){
      item.count += json.num
    }
  })
  localStorage.setItem('shopcarList',JSON.stringify(data))
}
//删除
export function deleteLocalData(id){
  let data = getLocalData()
  //根据id找到对应数据的索引 findIndex()
  let index = data.findIndex(item => {
    return item.id == id
  })
  data.splice(index,1)
  localStorage.setItem('shopcarList',JSON.stringify(data))
}