import React from 'react';

const ChatPills = (props)=>{
  const onClick = (pill)=>{
    props.addChatMsg(pill,null,'user')
  }
  return(
    <div className={`pill-container`}>
      {
        props.suggestions.map((pill,key)=>(
          <div 
            key={key}
            className="pill-msg" 
            dangerouslySetInnerHTML={{__html:pill}} 
            onClick={onClick.bind(null,pill)}></div>
        ))
      }
    </div>
  )
}

export default ChatPills