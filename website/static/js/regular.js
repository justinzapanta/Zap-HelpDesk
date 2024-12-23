function show_modal(id, display){
    if (display === 'true'){
        document.getElementById(id).classList.remove('hidden')
    }else{
        document.getElementById(id).classList.add('hidden')
    }
}


const selection_option = document.getElementById('selection_option')
const placeholder_container = document.getElementById('placeholder_container')

function selected_type(this_){
    if (this_.value == 'select'){
        selection_option.classList.remove('hidden')
        placeholder_container.classList.add('hidden')
    }else if (this_.value == 'image_upload' || this_.value == 'file_upload' || this_.value == 'checkbox' || this_.value == 'date') {
        placeholder_container.classList.add('hidden')
        selection_option.classList.add('hidden')
    }else {
        selection_option.classList.add('hidden')
        placeholder_container.classList.remove('hidden')
    }
}


const option_container = document.getElementById('option_container')
let total_option = 0

function add_new_option(){
    total_option += 1

    const new_div = document.createElement('div')
    new_div.classList.add('flex')
    new_div.id = `option-${total_option}`
    new_div.innerHTML = `
        <input placeholder="option ${total_option + 1}" id="option_input-${total_option}"  class=" options text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
        <div class="my-auto ml-2">
            <i onclick="delete_option(this)" container_id="option-${total_option}" class="fas fa-trash z-40 mr-1 text-red-400 hover:text-red-500 ml-1 hover:cursor-pointer "></i>
        </div>
    `
    
    option_container.prepend(new_div)
}


function delete_option(this_){
    total_option -= 1
    document.getElementById(this_.getAttribute('container_id')).remove()
}


const label_input = document.getElementById('label')
const select_type = document.getElementById('select_type')
const placeholder_input = document.getElementById('placeholder')
const select_required = document.getElementById('is_required')
const options_input = document.querySelectorAll('.options')

const no_field = document.getElementById('no_field')
const data = {}

function create_field(){
    let type = select_type.value
    let label = label_input.value
    let placeholder = placeholder_input.value
    let required = select_required.value

    if (label !== ''){
        if (!(label in data)){
            if (type == 'input' || type == 'input_number' || type == 'textarea'){
                data[label] = {}
                data[label]['type'] = type
                data[label]['placeholder'] = placeholder
                data[label]['required'] = required
            }


            const used_fields_container = document.getElementById('used_fields_container')
            const new_div = document.createElement('div')
            new_div.classList.add('flex', 'h-fit')
            new_div.id = label
            new_div.innerHTML = `
                <div class="py-2 flex-1 border border-lake-300 mt-3 px-2 truncate rounded-md flex gap-x-3">
                    <div class="flex-1 hover:cursor-pointer gap-x-3 flex">
                        <h1 class="font-roboto text-sm text-lake-700 flex-1 ">${label}</h1>
                    </div>
                </div>

                <div class="my-auto h-full mx-2.5">
                    <i onclick="delete_field('${label}')" class="fas fa-trash z-40 mt-2.5 text-red-400 hover:text-red-500 hover:cursor-pointer"></i>
                </div>
            `

            no_field.classList.add('hidden')
            used_fields_container.appendChild(new_div)

            
            if (required == 'true'){
                required = 'required'
            }else{
                required = ''
            }

            create_element(type, label, required, placeholder)
        }
    }
}


function delete_field(id){
    document.getElementById(id).remove()
    delete_element(id)
}


const form_field_container = document.getElementById('form_field_container')

function create_element(type, label, required, placeholder=''){
    let new_div = document.createElement('div')
    new_div.id = `${label}_input`

    if (type === 'input'){
        new_div.innerHTML = `
            <label for="${label}" class="block text-sm font-medium text-lake-700">${label}</label>
            <input ${required} placeholder="${placeholder}" type="text" name="${label}" autocomplete="name" class="text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
        `
    }else if (type === 'textarea'){
        new_div.innerHTML = `
            <label for="${label}" class="block text-sm font-medium text-lake-700">${label}</label>
            <textarea ${required}  name="${label}" rows="4" class="text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm"></textarea>
        `
    }

    form_field_container.appendChild(new_div)
}


function delete_element(label){
    document.getElementById(`${label}_input`).remove()
}




