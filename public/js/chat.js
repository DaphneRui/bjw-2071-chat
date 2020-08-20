let inputEle = document.getElementsByClassName('chat-input')[0]
let timer
// let originData

scrollToButtom()

stopTimer()

longPolling()

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

  // getMessage(contents)

}

// function getMessage(contents){

//   originData = contents

//   contents.filter((item)=>{

//     if(item.createdAt>originData[originData.length - 1].createdAt){
      

//       $.ajax({

//         type: 'get',
//         url: 'http://localhost:3000/chat/getMessage',
//         data: {
          
//         },
//         success: (result)=>{
  
//           alert('新消息')
          
//         },
//         error: (error)=>{
            
//         }
//       })
//     }
//   })

  
// }

function scrollToButtom(){
  let ele = document.getElementsByClassName('chat-content')[0]
  ele.scrollTop = ele.scrollHeight
}

function longPolling(){

  timer = setInterval(()=>{

    $.ajax({

      type: 'get',
      url: 'http://localhost:3000/chat/getContent',
      data: {
        
      },
      success: (result)=>{

        renderChat(result.contents)
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