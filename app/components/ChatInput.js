import React from 'react';

const ChatInput = (props)=>{
  const {onInputChange,inputValue,addChatMsg} = props
  const onKeyPress = (event)=>{
    if(event.which === 13 || event.keyCode === 13){
      addChatMsg()
    }
  }
  return(
    <div className='input-container'>
      <input onKeyPress={onKeyPress} placeholder='Type your message here...' type="text" value={inputValue} onChange={(e)=>{onInputChange(e)}}/>
      <div className='send-btn' onClick={addChatMsg}>SEND</div>
    </div>
  )
}

export default ChatInput