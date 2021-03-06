import React, {
  Component,
  Fragment
} from 'react';
import ChatInput from './ChatInput'
import ChatMsg from './ChatMsg'
import ChatPills from './ChatPills';
import VideoTag from './VideoTag';
import ImageSlider from './ImageSlider';
import getCurrentStepInputValues from '../config/flowLogic'

//component used to render the chat
class ChatScreen extends Component {
  //on valid chat input smooth scroll to bottom
  componentDidUpdate(prevProps, prevState, snapshot){
      this.dummyEl.scrollIntoView({ behavior: "smooth" });
  }
  //based on the type of chat message display the correct data
  renderMsg(msgData,addChatMsg){
    if(msgData.msg.isVideoStep){
      return(<VideoTag src={msgData.msg.src}/>)
    }else if(msgData.msg.suggestions){
      return(<Fragment>
        <ChatMsg  source={msgData.source} msg={msgData.msg.txt}/>
        <ChatPills suggestions={msgData.msg.suggestions} addChatMsg={addChatMsg}/>
      </Fragment>
      )
    } else if(msgData.msg.isSliderStep){
      return(<ImageSlider/>)
    }else{
      return(<ChatMsg {...msgData}/>)
    }
  }
  render() {
    const {onInputChange,addChatMsg} = this.props
    const {inputValue,chatMessages} = this.props.state
    return ( 
    <div className = 'chat-container' >
      <div className="chat-msg-container">
        <div ref={(node)=>(this.dummyEl=node)}></div>
        <div>
        {chatMessages.map((msgData,key)=>{
          return(
            <Fragment key={key}>
              {this.renderMsg(msgData,addChatMsg)}
            </Fragment>
          )
        })
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