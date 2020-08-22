let inputEle = document.getElementsByClassName('chat-input')[0]
let messageEle = document.getElementsByClassName('chat-message')[0]
let messageBtn = document.getElementsByClassName('message-button')[0]
let timer
let originData

renderMessage()

stopTimer()

longPolling()

scrollToButtom()

/* 
 * 当input中按回车，发送信息
*/
inputEle.onkeydown = function(e){
  var key = e.which

  //13代表enter按键
  if(key == 13){

    let value = inputEle.value

    if(value){

      $.ajax({

        type: 'post',
        url: 'http://localhost:3000/chat/addContent',
        data: {
          content: value
        },
        success: (result)=>{
          
          if(result.status === 'success'){

            renderChat(result.contents)

            inputEle.value = ''

            originData = result.contents

            scrollToButtom()


          }
        },
        error: (error)=>{

        }
      })
    }
  }
}

/* 
*新消息提示 
*/
function renderMessage(){
  $.ajax({
    type:'get',
    url:'http://localhost:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData = result.contents
    }
  })
}

/* 
*重新渲染聊天内容 
*/
function renderChat(contents){
  let html = ''
  contents.forEach((item) => {
    html += '<div class=\'chat-content-container\'>'+
                '<div class=\'chat-detail clearFix\'>'+
                '<div class=\'chat-detail-left\'>'+
                `<img src='${ item.avatar }' class='chat-avatar'/>`+
                `<div class='chat-name'>${ item.nickName }</div>`+
                '</div> '+
                `<div class='chat-detail-right'>${ item.content }</div> `+
                '</div> '+
                `<div class='chat-time'>${ moment(item.createdAt).locale('zh_cn').format('YYYYMMMMDo aHH:mm:ss') }</div> `
  })

    //清空
  $('.chat-content').html('')

    //重新渲染
  $('.chat-content').html(html)

    

}



function scrollToButtom(){
  let ele = document.getElementsByClassName('chat-content')[0]
  ele.scrollTop = ele.scrollHeight
}

function longPolling(){

    
  timer = setInterval(()=>{

    $.ajax({

      type: 'get',
      url: 'http://localhost:3000/chat/getContent',
      data: {},
      success: (result)=>{

        renderChat(result.contents)

          //判断是否有新消息
        result.contents.filter((item)=>{
            
          let flag = moment(originData[originData.length-1].createdAt).isBefore(moment(item.createdAt))
          if(flag){
            messageEle.style.visibility = 'visible'
          }

        })
          
      },
      error: (error)=>{
            
      }
    })
  },2000)
}

function stopTimer() {
    
  if(timer){
    clearInterval(timer)
  }
}

/* 
*关闭提示框 
*/
messageBtn.onclick = function(){
  messageEle.style.visibility = 'hidden'
  renderMessage()
}


