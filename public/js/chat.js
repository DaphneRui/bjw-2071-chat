let inputEle = document.getElementsByClassName('chat-input')[0]

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
          
        
        },
        error: (error)=>{
            
        }  
      })
    }

  }
  
}