function open_modal(id, update=false){
    const modal = document.getElementById(id)
    modal.classList.remove('hidden')

    if (update){
        document.getElementById('create_modal_title').textContent = 'Update Automated Ticket Routing'
        document.getElementById('create_button').textContent = 'Update'
    }else{
        document.getElementById('create_modal_title').textContent = 'Create Automated Ticket Routing'
        document.getElementById('create_button').textContent = 'Create'
    }

}


let data = {
    categories : [],
    priorities : []
}


function close_modal(id){
    const modal = document.getElementById(id)
    modal.classList.add('hidden')

    const categories = document.getElementById('categories')
    const priorities = document.getElementById('priorities')
    const assigned = document.getElementById('assigned')

    categories.classList.add('h-10')
    categories.innerHTML = ''

    priorities.classList.add('h-10')
    priorities.innerHTML = ''

    assigned.classList.add('h-10')
    assigned.innerHTML = ''

    document.getElementById('rule_name').value = ''

    data = {
        categories : [],
        priorities : []
    }

}

function selected(this_, key){
    if (!(data[`${key}`].includes(this_.value)) && this_.value != ''){
        data[key].push(this_.value)

        const container = document.getElementById(key)
        container.classList.remove('h-10')

        const new_div = document.createElement('div')
        new_div.classList.add('flex', 'bg-emerald-100', 'my-1', 'py-1', 'px-3' , 'mt-2')
        new_div.id = this_.value

        new_div.innerHTML = `
            <h1 class="mr-2">${this_.value}</h1>
            <div class="">
                <a onclick="delete_selected('${this_.value}', '${key}')" href="#" class="text-red-400 font-bold">X</a>
            </div>
        `

        container.appendChild(new_div)
    }

    this_.value = ''
}


function delete_selected(id, key){
    const index = data[key].indexOf(id)
    const selected = document.getElementById(id)
    selected.remove()

    data[key].splice(index, 1)

    if (data[key].length == 0){
        document.getElementById(key).classList.add('h-10')
    }
}
