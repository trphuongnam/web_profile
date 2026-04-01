function onSubmit() {
    const userName = getInputValue('username');
    const email = getInputValue('email');
    const subject = getInputValue('subject');
    const message = getInputValue('message');

    const elUsernameError = document.getElementById('username_error');
    const elEmailError = document.getElementById('email_error');
    const elSubjectError = document.getElementById('subject_error');
    const elMessageError = document.getElementById('message_error');

    elUsernameError.innerHTML = '';
    elEmailError.innerHTML = '';
    elSubjectError.innerHTML = '';
    elMessageError.innerHTML = '';

    const validUserName = validateContactForm(userName, 'username');
    if (validUserName.length > 0) {
        validUserName.forEach(err => {
            const txt = document.createElement("p");
            txt.textContent = err.message;
            elUsernameError.append(txt);
        });
    }

    const validEmail = validateContactForm(email, 'email');
    if (validEmail.length > 0) {
        validEmail.forEach(err => {
            const txt = document.createElement("p");
            txt.textContent = err.message;
            elEmailError.append(txt);
        });
    }

    const validSubject = validateContactForm(subject, 'subject');
    if (validSubject.length > 0) {
        validSubject.forEach(err => {
            const txt = document.createElement("p");
            txt.textContent = err.message;
            elSubjectError.append(txt);
        });
    }

    const validMessage = validateContactForm(message, 'message');
    if (validMessage.length > 0) {
        validMessage.forEach(err => {
            const txt = document.createElement("p");
            txt.textContent = err.message;
            elMessageError.append(txt);
        });
    }

    if (validEmail.length == 0 && validUserName.length == 0 && validMessage.length == 0 && validSubject.length == 0) {
        const contactForm = document.getElementById('contact_form');
        contactForm.classList.add('disabled');

        const contactSuccess = document.getElementById('contact_success');
        contactSuccess.classList.remove('disabled')
        contactSuccess.classList.add('show');
    }
}

function getInputValue(elId) {
    return document.getElementById(elId).value;
}

function validateContactForm(data, inputType) {
    result = [];
    switch (inputType) {
        case 'username':
            if (data.length < 1) {
                error = {
                    key: 'username',
                    type: 'required',
                    message: 'Required'
                };
                result.push(error);
                break;
            }
            if(data.length > 20) {
                error = {
                    key: 'username',
                    type: 'max_length',
                    message: 'The username must be less than 20 characters'
                };
                result.push(error);
            }
            break;
        case 'email':
            if (data.length < 1) {
                error = {
                    key: 'email',
                    type: 'required',
                    message: 'Required'
                };
                result.push(error);
                break;
            }
            const isValid = validateEmail(data);
            if (!isValid) {
                error = {
                    key: 'email',
                    type: 'invalid',
                    message: 'The email invalid'
                };
                result.push(error);
            }

            if(data.length > 150) {
                error = {
                    key: 'email',
                    type: 'max_length',
                    message: 'The email must be less than 150 characters'
                };
                result.push(error);
            }

            break;
        case 'subject':
            if (data.length < 1) {
                error = {
                    key: 'subject',
                    type: 'required',
                    message: 'Required'
                };
                result.push(error);
                break;
            }
            if(data.length > 200) {
                error = {
                    key: 'subject',
                    type: 'max_length',
                    message: 'The subject must be less than 200 characters'
                };
                result.push(error);
            }
            break;
        case 'message':
            if (data.length < 1) {
                error = {
                    key: 'message',
                    type: 'required',
                    message: 'Required'
                };
                result.push(error);
                break;
            }
            if(data.length > 500) {
                error = {
                    key: 'message',
                    type: 'max_length',
                    message: 'The message must be less than 500 characters'
                };
                result.push(error);
            }
            break;
        default:
            break;
        
    }

    return result;
}

function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email);
}
