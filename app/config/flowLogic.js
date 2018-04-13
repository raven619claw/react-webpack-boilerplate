let hairWashedTimes = null
let hairType = null
// defined the step logic in the file which based on the msg and current Active steps
// returns the validation erros and suggestions or in case of correct data moves on to next step
const getCurrentStepInputValues = (state, msg) => {
  let suggestions
  switch (state.currentStep) {
    case 1:
      suggestions = ['oily', 'dull', 'good']
      if (msg) {
        if (suggestions.indexOf(msg.toLowerCase()) > -1) {
          if (msg.toLowerCase() === 'good') {
            return {
              stepValidated: true,
              goToStep: 7,
              stepDelay: 2000
            }
          }
          hairType = msg
          return {
            stepValidated: true,
            goToStep: 2
          }
        } else {
          return {
            botMsg: `I'm Sorry i didnt get that`,
            suggestions
          }
        }
      } else {
        return {
          botMsg: `Hi, it is ${parseInt(state.userCityTemp)}&deg; F outside in ${state.userCity}. How is your hair feeling?`
        }
      }
      break;
    case 2:
      suggestions = ['more than 7', 'less than 7']
      if (msg) {
        hairWashedTimes = isNaN(parseInt(msg)) ? msg : parseInt(msg)
        if (parseInt(msg) < 7 || msg === 'less than 7') {
          return {
            stepValidated: true,
            goToStep: 3
          }
        } else if (parseInt(msg) > 7 || msg === 'more than 7') {
          return {
            stepValidated: true,
            goToStep: 4
          }
        } else {
          return {
            botMsg: `I'm Sorry i didnt get that`,
            suggestions
          }
        }
      } else {
        return {
          botMsg: `How many times do you wash your hair?`
        }
      }
      break;
    case 3:
      return {
        botMsg: `washing your hair ${hairWashedTimes} times per week when it is ${hairType} is not healthy`,
        stepValidated: true,
        goToStep: 5,
        stepDelay: 2000
      }
      break;
    case 4:
      return {
        botMsg: `washing your hair ${hairWashedTimes} times per week when it is ${hairType} is not healthy`,
        stepValidated: true,
        goToStep: 5,
        stepDelay: 2000
      }
      break;
    case 5:
      return {
        botMsg: `i recommend you use dove ${hairType === 'oily' ? 'oil control' : 'daily shine'} shampoo`,
        stepValidated: true,
        goToStep: 6,
        stepDelay: 2000
      }
      break;
    case 6:
    return {
      botMsg: {
        isSliderStep:true
      }
    }
      break;
    case 7:
      return {
        botMsg: `That is great`,
        stepValidated: true,
        goToStep: 8,
        stepDelay: 2000
      }
      break;
    case 8:
      return {
        botMsg: `I recommend you use dove oxygen moisture for even better results`,
        stepValidated: true,
        goToStep: 9,
        stepDelay: 2000
      }
      break;
    case 9:
      return {
        botMsg: {
          isVideoStep: true,
          src: 'https://www.youtube.com/watch?v=wsoN2C0JzWk'
        }
      }
      break;
  }
}
export default getCurrentStepInputValues