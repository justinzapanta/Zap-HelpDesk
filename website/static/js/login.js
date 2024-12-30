async function login_form(this_, event){
    const csrfToken = getCSRFToken()
    event.preventDefault()

    const response = await fetch('/api/send-mail', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrfToken
        },
        body : JSON.stringify({
            subject : 'Authentication Code',
            to : document.getElementById('company_email').value,
            type : "login"
        })
    })

    const response_json = await response.json()
    if (response_json.result == 'success'){
        document.getElementById('email-notif').classList.add('hidden')
        document.getElementById('verification_container').classList.remove('hidden')
    }else if(response_json.result == 'Invalid Email'){
        document.getElementById('email-notif').classList.remove('hidden')
    }

    console.log(response_json.result)
}

function close_verification(){
    document.getElementById('verification_container').classList.add('hidden')
    document.getElementById('email-notif').classList.add('hidden')
}