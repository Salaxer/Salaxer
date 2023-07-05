/**
 * 
 * @param {String} email 
 * @returns true if the test pass 
 */
export function checkEmail(email){
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email)
}
/**
 * 
 * @param {String} message 
 * @returns true if the test pass 
 */
 export function checkMessage(message){
    return (message.length > 30)
}