import React from 'react';

const ChatMsg = (props)=>{
  return(
    <div className={`${props.source} msg-container`}>
      <div className={`chat-msg`}>{props.msg}</div>
    </div>
  )
}

export default ChatMsg