async function submit_registration(this_, event){
    event.preventDefault()

    const csrfToken = getCSRFToken()
    const response = await fetch('/api/send-mail', {        
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'X-CSRFToken' : csrfToken
        },
        body : JSON.stringify({
            subject : 'Authentication Code',
            to : document.getElementById('company_email').value,
            type : "register"
        })
    })

    const response_json = await response.json()

    if (response_json.result == 'success'){
        document.getElementById('email-notif').classList.add('hidden')
        document.getElementById('verification_container').classList.remove('hidden')
    }else if(response_json.result == 'The email address is already in use.'){
        document.getElementById('email-notif').classList.remove('hidden')
    }
}


function close_verification(){
    document.getElementById('invalid-notif').classList.add('hidden')
    document.getElementById('verification_container').classList.add('hidden')
}


async function verify(){
    const csrfToken = getCSRFToken()
    const code_input = document.getElementById('code_input')

    if (code_input.value !== ''){
        const response = await fetch('/api/register', {
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json',
                'X-CSRFToken' : csrfToken,
            },
            body : JSON.stringify({
                code : code_input.value,
                fname : document.getElementById("fname").value,
                lname : document.getElementById('lname').value,
                company_name : document.getElementById('company_name').value,
                company_email : document.getElementById('company_email').value
            })
        })

        const response_json = await response.json()
        console.log('hello')
        if (response_json.result === 'Invalid Code'){
            document.getElementById('invalid-notif').classList.remove('hidden')
        }else if (response_json.result == 'success'){
            window.location.href = "/dashboard"
        }
    }   
}



