import React,{PureComponent} from 'react';

class ChatInput extends PureComponent{
  onKeyPress = (event)=>{
    if((event.which === 13 || event.keyCode === 13) && event.target.value){
      this.props.addChatMsg()
    }
  }
  render(){
    const {onInputChange,inputValue,addChatMsg} = this.props
    return(
      <div className='input-container'>
        <input onKeyPress={this.onKeyPress} placeholder='Type your message here...' type="text" value={inputValue} onChange={(e)=>{onInputChange(e)}}/>
        <div className='send-btn' onClick={()=>{inputValue && addChatMsg()}}>SEND</div>
      </div>
    )
  }
}

export default ChatInput