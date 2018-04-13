import React, {Component} from 'react';
import jsonp from 'jsonp-es6';

import ChatScreen from './ChatScreen';
import getCurrentStepInputValues from '../config/flowLogic'
const INITIAL_STATE = {
  onSplashScreen:true,
  chatMessages:[],
  showChatScreen:false,
  inputValue:'',
  userCity:null,
  userCityTemp:null,
  currentStep:1
}
class App extends Component {
  constructor(props,context){
    super(props,context)
    this.state = {...INITIAL_STATE}
    window.addEventListener('load',()=>{
      
    })
  }
  componentDidMount(){
    this.getCityData()
  }
  goToChatScreen(){
    setTimeout(()=>{
      this.setState({
        onSplashScreen:false,
        showChatScreen:true
      })
    },3000)
  }
  getCityData = () => {
    const that = this
    jsonp('https://ipinfo.io')
    .then((response) => {
      that.setState({
      userCity:response.city
      })
      return response.loc
    }).then((loc)=>{
      jsonp(`https://api.darksky.net/forecast/87ded8c629a2197462e1ff01459ba3b1/${loc}`)
      .then((response)=>{
        that.setState({
        userCityTemp:response.currently.apparentTemperature,
        onSplashScreen:false,
        showChatScreen:true
        },()=>{
          this.gotoNextStep(1)
        })
      })
    });
  }
  onInputChange = (event)=>{
    this.setState({
      inputValue:event.target.value
    })
  }

  addChatMsg = (botMsg,suggestions,tempSource)=>{
    if(this.state.currentStep > 2 && this.state.inputValue){
      const currentMessages = [...this.state.chatMessages]
      const inputValue = this.state.inputValue
      this.setState({
        chatMessages:[...currentMessages,{
          source:'user',
          msg:inputValue
        },{
          source:'bot',
          msg:`i'm sorry i can't understand you i'm just a bot!`
        }],
        inputValue:''
      })
      return
    }
    const source = tempSource || botMsg && 'bot' || 'user'
    let msg
    if(suggestions){
      msg = {
        txt:botMsg,
        suggestions
      }
    }else{
      msg = botMsg || this.state.inputValue
    }
    
    const currentMessages = [...this.state.chatMessages] 
    this.setState({
      chatMessages:[...currentMessages,{
        source,
        msg
      }],
      inputValue:''
    },()=>{
      if(source === 'user'){
        this.validateStep(msg)
      }
    })
    
    
  }
  validateStep=(msg)=>{
    const stepData = getCurrentStepInputValues(this.state,msg)
    if(stepData.stepValidated){
      this.gotoNextStep(stepData.goToStep,msg)
    }else{
      this.addChatMsg(stepData.botMsg,stepData.suggestions)
    }
    
  }
  gotoNextStep = (step)=>{
    this.setState({
      currentStep:step || this.state.currentStep + 1
    },()=>{
      const stepData = getCurrentStepInputValues({...this.state,currentStep:step || this.state.currentStep})
      this.addChatMsg(stepData.botMsg)
      if(stepData.stepDelay){
        setTimeout(()=>{
          this.gotoNextStep(stepData.goToStep)
        },500)
      }
    })
    
  }
  render() {
    return ( 
    <div className = 'chat-home' >
      {this.state.showChatScreen &&
        <ChatScreen onInputChange={this.onInputChange} addChatMsg={this.addChatMsg.bind(this)} state={this.state}/>
      }
    </div>
    );
  }
};

export default App;