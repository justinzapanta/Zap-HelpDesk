async function login_form(event=false){
    if (event){
        event.preventDefault()
        const csrfToken = getCSRFToken()
    
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
    }else{
        document.getElementById('login_form').submit()
    }
}

function close_verification(){
    document.getElementById('verification_container').classList.add('hidden')
    document.getElementById('email-notif').classList.add('hidden')
}


async function verify(){
    const csrfToken = getCSRFToken()
    const code_input = document.getElementById('code_input')

    if (code_input.value !== ''){
        const response = await fetch('/api/virification', {
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json',
                'X-CSRFToken' : csrfToken,
            },
            body : JSON.stringify({
                code : code_input.value,
                company_email : document.getElementById('company_email').value
            })
        })

        const response_json = await response.json()
        if (response_json.result === 'Invalid Code'){
            document.getElementById('email-notif').classList.remove('hidden')
        }else if (response_json.result == 'success'){
            login_form()
        }
    }   
}
