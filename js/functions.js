//Function to check if name is long enough
function isNameLongEnough (name) {
    if(name.length < 5) {
        
        return false
        
    }
      return true
}

//Function to check if email is valid
function isEmailValid(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

//Function to check if the subject is long enough
function isSubjectLongEnough (subject) {
    if(subject.length < 15) {
        
        return false
        
    }
      return true
}

//Function to check if the message is long enough
function isMessageLongEnough (message) {
    if(message.length < 25) {
        
        return false
        
    }
      return true
}

// Function to display the error message
function displayErrorMessageInHtmlElement(htmlElement, errorMessage) {
    htmlElement.innerHTML = errorMessage;
    htmlElement.style.display = "block";

}

export {
    isNameLongEnough,
    isEmailValid,
    isSubjectLongEnough,
    isMessageLongEnough,
    displayErrorMessageInHtmlElement
};