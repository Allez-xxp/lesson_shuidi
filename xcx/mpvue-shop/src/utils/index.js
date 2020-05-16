function formatNumber (n) {  //格式化时间
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// ------------请求封装
const host = "http:/localhost:5757/lm"
export { host };
//请求封装，封装接口请求一般都是封装成一个方法
// header={}请求头，要不要都行
function request(url, method, data, header={}) {
  //每次请求时都会耗时的，为了提高用户体验感，我们加一个loading
  wx.showLoading({
    title:"正在玩命加载中...",
  });

  // 把wx.request接口请求封装成promise data是要向后端接口传的参数
  // 把wx.request接口请求封装成function request这个方法，以后用直接调用
  return new Promise((resolve,reject) => {
    wx.request({
      url: host + url,
      method: data,
      header:{
        "content-type": "application/json" //默认的请求头
      },
      success(res){
        wx.hideLoading();//把之前的页面加载中隐藏掉
        resolve(res.data) //这里的data跟data:data的是不一样的，这是response返回值里的data
      },
      fail(error){
        wx.hideLoading();
        reject(false)
      },
      complete (){
        wx.hideLoading();
      }
    })
  })
}
//把get,post方法也封装一下（本栈全部的接口请求只用都用GET，或POST方法）
export function get(url,data) {
  return request(url,'GET', data)  //调用request方法
}
export function post(url,data) {
  return request(url,'POST', data)  //调用request方法
}

export default {
  formatNumber,
  formatTime
}
