import React, {Component} from 'react';
import ChatScreen from './ChatScreen';
import jsonp from 'jsonp-es6';
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
    // this.goToChatScreen()
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
    jsonp('http://ipinfo.io')
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
        })
      })
    });
  }
  onInputChange = (event)=>{
    this.setState({
      inputValue:event.target.value
    })
  }

  addChatMsg = (botMsg)=>{
    const source = botMsg && 'bot' || 'user'
    const msg = botMsg || this.state.inputValue
    const currentMessages = [...this.state.chatMessages]
    this.setState({
      chatMessages:[...currentMessages,{
        source,
        msg
      }],
      inputValue:''
    })
  }
  render() {
    return ( 
    <div className = 'chat-home' >
      {this.state.showChatScreen &&
        <ChatScreen onInputChange={this.onInputChange} addChatMsg={this.addChatMsg} {...this.state}/>
      }
    </div>
    );
  }
};

export default App;