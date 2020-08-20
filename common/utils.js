const _ = require('lodash')
const moment = require('moment')

/* 
*获取随机头像
*/
function getRandomAvatar() { 

  // 放在网络图床中的图片
  const avatars = [
    'https://wx2.sbimg.cn/2020/08/19/3KgUj.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3KLKh.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3KeNI.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3KzJG.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3K7UT.jpg', 
    'https://wx1.sbimg.cn/2020/08/19/3WxzM.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3W8ra.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3WbjI.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WlxK.jpg', 
    'https://wx2.sbimg.cn/2020/08/19/3WOmG.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WSdT.jpg',
    'https://wx2.sbimg.cn/2020/08/19/3WTZw.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WyIo.jpg', 
    'https://wx2.sbimg.cn/2020/08/19/3WFGl.jpg',
    'https://wx1.sbimg.cn/2020/08/19/3WIz1.jpg'
  ]

  // 获取随机数组下标
  let index = _.random(0,14)
  
  return avatars[index]
}

/* 
 * 格式化时间
*/
function formatTime(time){

  return moment(time).locale('zh_cn').format('YYYYMMMMDo aHH:mm:ss')
}

module.exports = {
  getRandomAvatar,
  formatTime
}