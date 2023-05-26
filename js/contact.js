import {isNameLongEnough, isEmailValid, isSubjectLongEnough, isMessageLongEnough, displayErrorMessageInHtmlElement} from "./functions.js";

document.forms["contact-form"].onsubmit = function(event) {
    let isValid = true;
    const nameErrorHtmlElement = document.querySelector(".name-error")
    if(this.name.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            nameErrorHtmlElement, 
            "please enter your name"
        ); 
        isValid = false
    } else if (!isNameLongEnough(this.name.value)) {
        displayErrorMessageInHtmlElement(
            nameErrorHtmlElement, "The name must be at least 5 characters");
        isValid = false
    } else {
        nameErrorHtmlElement.innerHTML = "";
    }
    const emailErrorHtmlElement = document.querySelector(".email-error")
    if(this.email.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            emailErrorHtmlElement,
            "please enter your email address"
        );
        isValid = false
    } else if (!isEmailValid(this.email.value)) {
        displayErrorMessageInHtmlElement(
            emailErrorHtmlElement, "Please enter a valid email address"
        );
        isValid = false
    } else {
        emailErrorHtmlElement.innerHTML = ""
    }
    const subjectErrorHtmlElement = document.querySelector(".subject-error")
    if(this.subject.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            subjectErrorHtmlElement, 
            "please enter your subject"
        ); 
        isValid = false
    } else if (!isSubjectLongEnough(this.subject.value)) {
        displayErrorMessageInHtmlElement(
            subjectErrorHtmlElement, "The subject must be at least 15 characters");
        isValid = false
    } else {
        subjectErrorHtmlElement.innerHTML = ""
    }
    const messageErrorHtmlElement = document.querySelector(".message-error")
    if(this.message.value.trim() === "") {
        displayErrorMessageInHtmlElement (
            messageErrorHtmlElement, 
            "please enter your message"
        ); 
        isValid = false
    } else if (!isMessageLongEnough(this.message.value)) {
        displayErrorMessageInHtmlElement(
            messageErrorHtmlElement, "The message must be at least 25 characters");
        isValid = false
    } else {
        messageErrorHtmlElement.innerHTML = ""
    }

    if(isValid) {
        const successHtmlElement = document.querySelector(".success");
        successHtmlElement.innerHTML = "Message successfully sent";
        successHtmlElement.style.display = "block";
        console.log(isValid);
        document.querySelector("#contact-form").reset(); 
        setTimeout(function() {
            document.querySelector(".success").style.display = "none";
            
        }, 3000);
         
    };
    event.preventDefault();

    return isValid;
    };

