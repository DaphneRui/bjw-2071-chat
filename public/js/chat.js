let inputEle = document.getElementsByClassName('chat-input')[0]


inputEle.onblur = function(){

  let content = inputEle.value

  if(content){

    $.ajax({

      type: 'post',
      url: 'http://localhost:3000/chat',
      data: {
        content
      },
      success: (result)=>{
  
        
      },
      error: (error)=>{
            
      }  
    })
  }
}