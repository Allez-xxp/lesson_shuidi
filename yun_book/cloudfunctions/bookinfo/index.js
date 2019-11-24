var cloud = require('wx-server-sdk'); //云服务器
var rp = require('request-promise'); //npm ,各api发出请求
cloud.init();

exports.main = async(event,context) =>{   //异步
  
  console.log(`http://feedback.api.juhe.cn/ISBN?
  sub=${event.isbn}&key=bf05c8f986cd713c3f189fd9c75527b8`)
  var res = rp(`http://feedback.api.juhe.cn/ISBN?
  sub=${event.isbn}&key=bf05c8f986cd713c3f189fd9c75527b8`).then(html =>{
    return html;
  })
  return res;
}