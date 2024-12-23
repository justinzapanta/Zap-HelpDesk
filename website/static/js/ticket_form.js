
const form_name = document.getElementById('form-name')
const input_container = document.getElementById('input_container')
const guide = document.getElementById('guide')
const next_button = document.getElementById('next_button')

function reset(){
    form_name.value = ''
    form_name.classList.replace('border-red-400', 'border-gray-400')
    input_container.classList.remove('hidden')
    guide.classList.add('hidden')
    next_button.textContent = 'Next'
    next_button.classList.replace('px-5', 'px-10')
}

function display_modal(id, display){
    const modal = document.getElementById(id)
    if (display === 'show'){
        modal.classList.remove('hidden')
        reset()
    }else{
        modal.classList.add('hidden')
    }
}


const create_form = document.getElementById('create_form')

function next(){
    if (next_button.textContent === 'Save & Customize Now'){
        create_form.submit()
    }else{
        if (form_name.value !== ''){
            input_container.classList.add('hidden')
            guide.classList.remove('hidden')
            next_button.classList.replace('px-10', 'px-5')
            next_button.textContent = 'Save & Customize Now'
        }else{
            form_name.classList.replace('border-gray-400', 'border-red-400')
        }
    }
}

