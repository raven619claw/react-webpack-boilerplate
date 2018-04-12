import React, {
  Component
} from 'react';
import ChatInput from './ChatInput'
import ChatMsg from './ChatMsg'
class ChatScreen extends Component {

  componentDidMount(){
    this.props.addChatMsg(`Hi, it is ${parseInt(this.props.userCityTemp)} degrees F outside in ${this.props.userCity}. How is your hair feeling?`)
  }
  render() {
    const {onInputChange,inputValue,addChatMsg,chatMessages} = this.props
    return ( 
    <div className = 'chat-container' >
      <div className="chat-msg-container">
        <div>
        {chatMessages.map((msg,key)=>(
          <ChatMsg key={key} {...msg}/>
        ))
        }
        </div>
      </div>
      <div className="chat-input-container">
      <ChatInput onInputChange={onInputChange} addChatMsg={addChatMsg} inputValue={inputValue}/>
      </div>
    </div>
    );
  }
};

export default ChatScreen;