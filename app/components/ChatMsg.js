import React from 'react';
//display the basic chat messages
const ChatMsg = (props)=>{
  if(!props.msg){
    return (<div/>)
  }
  return(
    <div className={`${props.source} msg-container`}>
      <div className={`chat-msg`} dangerouslySetInnerHTML={{__html:props.msg}}></div>
    </div>
  )
}

export default ChatMsg