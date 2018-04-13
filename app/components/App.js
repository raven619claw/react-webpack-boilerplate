import React, {Component} from 'react';
import jsonp from 'jsonp-es6';

import ChatScreen from './ChatScreen';
import getCurrentStepInputValues from '../config/flowLogic'
// this is the main app which contains the logic for user actions
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
  // after getting the location data and delay of 3 sec go to chat screen
  goToChatScreen(){
    setTimeout(()=>{
      this.setState({
        onSplashScreen:false,
        showChatScreen:true
      })
    },3000)
  }
  // get the location and temp data and move to chat screen
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
        },()=>{
          this.goToChatScreen()
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
  // main msg to add chats to the scrren
  // based on the origin of chat can segregate what action to take
  addChatMsg = (botMsg,suggestions,tempSource)=>{
    //if user has passed the steps where input is needed then give a dummy response
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
    // based on step data correct data is addded to the chatMessages obj
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
      //after updating chat data is the origin of chat msg is user then perform validations
      if(source === 'user'){
        this.validateStep(msg)
      }
    })
  }
  //validate step to go to next step based on user msg
  //if err then provide suggestions to user for correct input
  validateStep=(msg)=>{
    const stepData = getCurrentStepInputValues(this.state,msg)
    if(stepData.stepValidated){
      this.gotoNextStep(stepData.goToStep,msg)
    }else{
      this.addChatMsg(stepData.botMsg,stepData.suggestions)
    }
    
  }
  //goto next step
  //if user input is not required then keep going to next steps in flow after delay
  // the creates a chat like experience
  gotoNextStep = (step)=>{
    this.setState({
      currentStep:step || this.state.currentStep + 1
    },()=>{
      const stepData = getCurrentStepInputValues({...this.state,currentStep:step || this.state.currentStep})
      this.addChatMsg(stepData.botMsg)
      if(stepData.stepDelay){
        setTimeout(()=>{
          this.gotoNextStep(stepData.goToStep)
        },stepData.stepDelay)
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