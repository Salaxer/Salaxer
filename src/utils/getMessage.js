import { checkEmail, checkMessage } from "./regex"
/**
 * 
 * @param {String} email 
 * @param {String} message 
 * @param {String} name 
 * @returns {[{id: number, title: string, message: string, life: number}, boolean]}
 */
export const getMessageForm = (email, message, name) =>{
    if(name.length<1){
      return [{
        id: Date.now(),
        title: 'Error',
        message: "Please insert a correct name",
        life: 4000,
      }, true]
    }
    if(!checkEmail(email)){
      return [{
        id: Date.now(),
        title: 'Error',
        message: "The email is wrong, please make sure you are introducing the right credentials",
        life: 4000,
      }, true]
    }
    if(!checkMessage(message)){
        return [{
          id: Date.now(),
          title: 'Error',
          message: "The Message must contain at least 30 characters",
          life: 4000,
        }, true]
      }
    return [{
        id: Date.now(),
        title: 'Sent',
        message: "An email has been sent, thank you for contacting me, I will get back to you as soon as possible",
        life: 10000,
    }, false]
}