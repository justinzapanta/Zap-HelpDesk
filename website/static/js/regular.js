const submit_ticket_button = document.getElementById('submit_ticket_button')

function show_modal(id, display){
    if (display === 'true'){
        document.getElementById(id).classList.remove('hidden')
        submit_ticket_button.setAttribute('type', 'button')
    }else{
        document.getElementById(id).classList.add('hidden')
        submit_ticket_button.setAttribute('type', 'submit')
    }
}


const selection_option = document.getElementById('selection_option')
const placeholder_container = document.getElementById('placeholder_container')

function selected_type(this_){
    if (this_.value == 'select'){
        selection_option.classList.remove('hidden')
        placeholder_container.classList.add('hidden')
    }else if (this_.value == 'upload_image' || this_.value == 'upload_file' || this_.value == 'checkbox' || this_.value == 'date') {
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
        <input placeholder="option" id="option_input-${total_option}"  class="options text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
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

const no_field = document.getElementById('no_field')
let data = {}

function create_field(){
    let type = select_type.value
    let label = label_input.value
    let placeholder = placeholder_input.value
    let required = select_required.value

    if (label !== ''){
        if (!(label in data)){
            if (type !== 'select' ){
                data[label] = {}
                data[label]['type'] = type
                data[label]['placeholder'] = placeholder
                data[label]['required'] = required
            }else{
                data[label] = {}
                data[label]['type'] = type
                data[label]['options'] = []
                data[label]['placeholder'] = placeholder
                data[label]['required'] = required
            }

            const used_fields_container = document.getElementById('used_fields_container')
            const new_div = document.createElement('div')
            new_div.classList.add('flex', 'h-fit')
            new_div.id = label
            new_div.innerHTML = `
                <div id="used-field-${label}" class="used-fields py-2 flex-1 border border-lake-300 mt-3 px-2 truncate rounded-md flex gap-x-3">
                    <div id="selected_used-${label}" onclick="selected_used_field('${label}')" class="flex-1 hover:cursor-pointer gap-x-3 flex">
                        <h1 id="used_field_label-${label}" class="font-roboto text-sm text-lake-700 flex-1 ">${label}</h1>
                    </div>
                </div>

                <div class="my-auto h-full mx-2.5">
                    <i id="trash-${label}" onclick="delete_field('${label}')" class="fas fa-trash z-40 mt-2.5 text-red-400 hover:text-red-500 hover:cursor-pointer"></i>
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
            label_input.classList.replace('border-red-400', 'border-lake-300')
        }else{
            label_input.classList.replace('border-lake-300', 'border-red-400')
        }
    }else{
        label_input.classList.replace('border-lake-300', 'border-red-400')
    }
}


function delete_field(id){
    delete data[id]
    document.getElementById(id).remove()
    delete_element(id)
    
    if(temp_key == id){
        cancel_update()
        reset()
    }
}


const form_field_container = document.getElementById('form_field_container')

function create_element(type, label, required, placeholder='', update_tag=false){
    let new_div = document.createElement('div')
    new_div.id = `${label}_input`
    let tag_and_label

    if (type === 'input' || type === 'input_number' || type === 'date'){
        if (type === 'input'){
            type = 'text'
        }else if (type === 'input_number'){
            type = 'number'
        }else{
            type = 'date'
            placeholder_container.classList.add('hidden')
        }

        tag_and_label = `
            <label for="${label}" id="label-${label}" class="block text-sm break-words font-medium text-lake-700">${label}</label>
            <input ${required} placeholder="${placeholder}" id="input-${label}" type="${type}" name="${label}" autocomplete="name" class="text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
        `

        new_div.innerHTML = tag_and_label
    }else if (type === 'textarea'){
        tag_and_label = `
            <label for="${label}" id="label-${label}"  class="block text-sm break-words font-medium text-lake-700">${label}</label>
            <textarea ${required} placeholder="${placeholder}" id="input-${label}"  name="${label}" rows="4" class="text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm"></textarea>
        `

        new_div.innerHTML = tag_and_label
    }else if (type === 'select' && !update_tag){
        const options_input = document.querySelectorAll('.options')
        let html_options = ''
        
        options_input.forEach(option => {
            html_options += `<option value="${option.value}">${option.value}</option> \n`
            data[label]['options'].push(option.value)
        })

        tag_and_label = `
            <label for="${label}" id="label-${label}"  class="block text-sm break-words font-medium text-lake-700">${label}</label>
            <select ${required} name="${label}" id="input-${label}" autocomplete="tel" class="mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 text-lake-700 sm:text-sm">
                ${html_options}
            </select>
        `

        new_div.innerHTML = tag_and_label
    }else if(type === 'upload_image'){
        tag_and_label = `
        <label for="${label}" id="label-${label}"  class="block text-sm break-words font-medium text-lake-700">${label}</label>
        <input ${required} placeholder="${placeholder}" id="input-${label}" type="file" name="${label}" accept="image/*" class="text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
        `

        new_div.innerHTML = tag_and_label
    }else if(type === 'checkbox'){
        tag_and_label = `
            <div class="flex gap-x-2">
                <input ${required} id="input-${label}" placeholder="${placeholder}" type="checkbox" name="${label}" class="text-lake-700 block rounded-md shadow-sm w-4 h-4 py-2 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
                <label for="${label}" id="label-${label}"  class="block text-sm break-words font-medium text-lake-700">${label}</label>
            </div>
        `

        new_div.innerHTML = tag_and_label
    }

    if (!(update_tag)){
        form_field_container.appendChild(new_div)
        reset()
    }else{
        update_tag.innerHTML = tag_and_label
    }
}


function delete_element(label){
    document.getElementById(`${label}_input`).remove()
}


function reset(){
    label_input.value = ''
    placeholder_input.value = ''

    select_type.value = 'input'
    select_required.value = 'true'

    option_container.innerHTML = `
        <div id="option-1" class="flex">
            <input placeholder="option 1"  class=" options text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
            <div class="my-auto ml-2">
                <i onclick="delete_option(this)" container_id="option-1" class="fas fa-trash z-40 mr-1 text-red-400 hover:text-red-500 ml-1 hover:cursor-pointer "></i>
            </div>
        </div>
    `

    selection_option.classList.add('hidden')
    placeholder_container.classList.remove('hidden')
    total_option = 0

    const used_fields = document.querySelectorAll('.used-fields')
    used_fields.forEach(used_field => {
        const filed = document.getElementById(used_field.id)

        filed.classList.replace('border-lake-700', 'border-lake-300')
        filed.classList.remove('border-2')
    })
}

let update_button_container = document.getElementById('update_button_container')
let create_button = document.getElementById('create_button')
let temp_key
let update = false

function selected_used_field(id){
    update = true
    selection_option.classList.add('hidden')
    const used_fields = document.querySelectorAll('.used-fields')
    const selected = document.getElementById(`used-field-${id}`)
    global_id = id

    selected.classList.replace('border-lake-300', 'border-lake-700')
    selected.classList.add('border-3')
    
    used_fields.forEach(used_field => {
        const filed = document.getElementById(used_field.id)

        if (used_field.id !== `used-field-${id}`){
            filed.classList.replace('border-lake-700', 'border-lake-300')
            filed.classList.remove('border-2')
        }
    })

    temp_key = id
    
    label_input.value = id
    select_type.value = data[id]['type']
    placeholder_input.value = data[id]['placeholder']
    select_required.value = data[id]['required']
    update_button_container.classList.remove('hidden')
    create_button.classList.add('hidden')

    const option_container = document.getElementById('option_container')
    option_container.innerHTML = ''
    
    if (data[id]['type'] === 'select'){
        let options_html = ''
        selection_option.classList.remove('hidden')
        placeholder_container.classList.add('hidden')
        let count = 0

        data[id]['options'].forEach(option => {
            const new_div = document.createElement('div')
            new_div.classList.add('flex')
            new_div.id = `option-${count}`

            options_html = `
                <input placeholder="option" value="${option}" class="options text-lake-700 mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 sm:text-sm">
                <div class="my-auto ml-2">
                    <i onclick="delete_option(this)" container_id="option-${count}" class="fas fa-trash z-40 mr-1 text-red-400 hover:text-red-500 ml-1 hover:cursor-pointer "></i>
                </div>
            `
            count += 1

            new_div.innerHTML = options_html
            option_container.appendChild(new_div)
        })
    }
}


function cancel_update(){
    reset()
    label_input.classList.replace('border-red-400', 'border-lake-300')

    temp_key = ''
    update_button_container.classList.add('hidden')
    create_button.classList.remove('hidden')
    update = false
}


let selected_label
function update_field(){
    let label_id = `label-${temp_key}`
    let input_id = `input-${temp_key}`
    let used_field_text = `used_field_label-${temp_key}`
    let trash_id = `trash-${temp_key}`
    let field_container = `${temp_key}_input`
    let selected_id 

    let label_input_value = label_input.value
    let select_required_value = select_type.value

    selected_label = label_id

    if (temp_key !== ''){
        let type_not_change = true

        if (data[temp_key]['type'] !== select_required_value){
            type_not_change = false
            const obj_key = label_input_value
            const tag_container = document.getElementById(field_container)
            const field_input = document.getElementById(input_id)
            const input_label = document.getElementById(label_id)

            input_label.remove()
            field_input.remove()

            if (select_required_value !== 'select'){
                create_element(type=select_required_value, label=label_input_value, 
                    required=select_required_value, placeholder=placeholder_input.value , update_tag=tag_container
                )
            }
        }


        if (temp_key == label_input_value){
            //update
            const options = document.querySelectorAll('.options')
            data[temp_key]['type'] = select_required_value
            data[temp_key]['placeholder'] = placeholder_input.value
            data[temp_key]['required'] = select_required.value

            if (select_required_value == 'select'){
                data[temp_key]['options'] = []
                
                options.forEach(option => {
                    data[temp_key]['options'].push(option.value)
                })
            }

            if (type_not_change && select_required_value == 'select'){
                const field_input = document.getElementById(`input-${temp_key}`)
                let option_html = ''
                const field_input_container = document.getElementById(`${temp_key}_input`)

                options.forEach(option => {
                    option_html += `<option value="${option.value}">${option.value}</option> \n`
                })

                field_input.innerHTML = option_html
 
            }else if(!type_not_change && select_required_value == 'select'){
                let html_options = ''
                
                options.forEach(option => {
                    html_options += `<option value="${option.value}">${option.value}</option> \n`
                })
        
                tag_and_label = `
                    <label for="${temp_key}" id="label-${temp_key}"  class="block text-sm break-words font-medium text-lake-700">${temp_key}</label>
                    <select ${select_required_value} name="${temp_key}" id="input-${temp_key}" autocomplete="tel" class="mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 text-lake-700 sm:text-sm">
                        ${html_options}
                    </select>
                `
                document.getElementById(`${temp_key}_input`).innerHTML = tag_and_label
            }

        }else{
            //createa and delete
            const options = document.querySelectorAll('.options')

            const temp_obj = {}
            for (key in data){
                if (key === temp_key){
                    temp_obj[label_input_value] = data[temp_key]
                    continue
                }

                temp_obj[key] = data[key]
            }
            
            data = temp_obj

            data[label_input_value] = {}
            data[label_input_value]['type'] = select_required_value
            data[label_input_value]['placeholder'] = placeholder_input.value
            data[label_input_value]['required'] = select_required.value 
           
            if (select_required_value == 'select'){
                data[label_input_value]['options'] = []
                
                options.forEach(option => {
                    data[label_input_value]['options'].push(option.value)
                })
            }

            console.log(data)


            if (type_not_change && select_required_value == 'select'){
                const field_input = document.getElementById(`input-${temp_key}`)
                let option_html = ''
                const field_input_container = document.getElementById(`${temp_key}_input`)

                options.forEach(option => {
                    option_html += `<option value="${option.value}">${option.value}</option> \n`
                })

                field_input.innerHTML = option_html
 
            }else if(!type_not_change && select_required_value == 'select'){
                let html_options = ''
                
                options.forEach(option => {
                    html_options += `<option value="${option.value}">${option.value}</option> \n`
                })
        
                tag_and_label = `
                    <label for="${temp_key}" id="label-${temp_key}"  class="block text-sm break-words font-medium text-lake-700">${temp_key}</label>
                    <select ${select_required_value} name="${temp_key}" id="input-${temp_key}" autocomplete="tel" class="mt-1 block w-full border border-lake-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-lake-500 focus:border-lake-500 text-lake-700 sm:text-sm">
                        ${html_options}
                    </select>
                `
                document.getElementById(`${temp_key}_input`).innerHTML = tag_and_label
            }
        }

        if (type_not_change){
            document.getElementById(label_id).textContent = label_input_value
            document.getElementById(used_field_text).textContent = label_input_value
            document.getElementById(input_id).placeholder = placeholder_input.value
        }
        
        const used_field = document.getElementById(`used-field-${temp_key}`)
        used_field.id =  `used-field-${label_input_value}`

        const selected_used = document.getElementById(`selected_used-${temp_key}`)
        selected_used.id = `selected_used-${label_input_value}`

        selected_used.setAttribute("onclick", `selected_used_field('${label_input_value}')`)

        if (type_not_change || select_required_value === 'select'){
            const label_input_id = document.getElementById(label_id)
            label_input_id.id = `label-${label_input_value}`

            input_in_form = document.getElementById(input_id)
            input_in_form.id = `input-${label_input_value}`

            if (select_required_value === 'select'){
                label_input_id.textContent = label_input_value
            }
        }

        const h1_used_field_label = document.getElementById(used_field_text)
        h1_used_field_label.id = `used_field_label-${label_input_value}`
        h1_used_field_label.textContent = label_input_value

        const trash = document.getElementById(trash_id)
        trash.setAttribute('onclick', `delete_field('${label_input_value}')`)
        trash.id = `trash-${label_input_value}`

        const selected_card = document.getElementById(temp_key)
        selected_card.id = label_input_value

        const container_ng_field = document.getElementById(field_container)
        container_ng_field.id = `${label_input_value}_input`

        temp_key = label_input_value
        cancel_update()
    }
}
