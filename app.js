
let body = document.querySelector('body')
let toggle = document.getElementById('toggleTheme')
let imageToggle = document.getElementById('imageToggle')
let input = document.getElementById('todoInput')
let todoContainer = document.querySelector('.todoContainer')
let content = document.querySelectorAll('.content')
let filterContainer = document.querySelector('.filterContainer')
let filter = document.querySelectorAll('.filter')
let footer = document.querySelector('footer')



// toggling theme
toggle.addEventListener('click',() => {
    body.classList.toggle('darkBody')
    input.classList.toggle('darkInput')
    todoContainer.classList.toggle('darkTodoContainer')
    filterContainer.classList.toggle('darkFilterContainer')
    filter.forEach(btnFilter => {
        btnFilter.classList.toggle('darkFilter')
    })
    footer.classList.toggle('darkFooter')
    if(body.classList.contains('darkBody')) {
        imageToggle.src = './images/icon-sun.svg'
    } else {
        imageToggle.src = './images/icon-moon.svg'
    }
})



// adding list 
let formInput = document.forms['addList'];
let mainContainer = document.querySelector('.main')

formInput.addEventListener('submit',e => {
    e.preventDefault();
    // grab the input value
    let todoInput = document.getElementById('todoInput').value;
    const itemAmount = document.getElementsByTagName('li')
    const id = itemAmount.length
    // make all the element
    const li = document.createElement('li')
    const mainDiv = document.createElement('div')
    const innerDiv = document.createElement('div')
    const innerCheck = document.createElement('input')
    innerCheck.setAttribute('type','checkbox')
    innerCheck.setAttribute('id',id)
    const label = document.createElement('label')
    label.setAttribute('for',id)
    const todo = document.createElement('p')
    todo.setAttribute('class','content')
    const button = document.createElement('button')
    const image = document.createElement('img')
    image.src = './images/icon-cross.svg'
    const hr = document.createElement('hr')

    // adding classes

    mainDiv.classList.add('toDoList');
    innerDiv.classList.add('innerDiv')
    innerCheck.classList.add('todoCheck')
    todo.textContent = todoInput;
    image.src = './images/icon-cross.svg'
    image.classList.add('delete')
    todo.classList.add('content')
    button.classList.add('delete')



    // appending the newly created element to their position.

    li.appendChild(mainDiv)
    mainDiv.appendChild(innerDiv)
    innerDiv.appendChild(innerCheck)
    innerDiv.appendChild(label)
    innerDiv.appendChild(todo)
    innerDiv.appendChild(button)
    button.appendChild(image)
    mainDiv.appendChild(hr)


    let list = document.querySelector('.todoContainer ul')
    list.appendChild(li)

    // adding task remain text when submit is clicked

    let taskRemain = document.querySelector('.taskRemain')
    taskRemain.innerHTML = `${itemAmount.length} items left`

    formInput.reset();
})

// delete function

mainContainer.addEventListener('click',(e) => {
    if(e.target.className === 'delete') {
        // ascending the dom 4 times to get to li.
        const targetDelete = e.target.parentElement.parentElement.parentElement.parentElement;
        let list = document.querySelector('.todoContainer ul')
        list.removeChild(targetDelete)

        // reducing item remain when clicked
        const itemAmount = document.getElementsByTagName('li')
        let taskRemain = document.querySelector('.taskRemain')
        taskRemain.innerHTML = `${itemAmount.length} items left`
    }
})

// marking completed action
mainContainer.addEventListener('click',strike);

function strike() {
    let check = document.querySelectorAll('.todoCheck')
    check.forEach(chk => {
        if(chk.checked) {
            let listContent = chk.nextSibling.nextSibling;
            listContent.classList.add('contentClicked')

            let parentLi = chk.parentElement.parentElement.parentElement
            parentLi.setAttribute('data-action','completed')
        } else {
            let listContent = chk.nextSibling.nextSibling;
            listContent.classList.remove('contentClicked')
            let parentLi = chk.parentElement.parentElement.parentElement
            parentLi.removeAttribute('data-action')
        }
    })

}

// clearing completed task
mainContainer.addEventListener('click',clearComplete)

function clearComplete(e) {
    if(e.target.id === 'clear') {
        let allItem  = document.querySelectorAll('li');
        allItem.forEach(item => {
            let hasAttr = item.hasAttribute('data-action')
            if(hasAttr) {
                item.remove();
                const itemAmount = document.getElementsByTagName('li')
                let taskRemain = document.querySelector('.taskRemain')
                taskRemain.innerHTML = `${itemAmount.length} items left`
            }
        })
    }
}

// filtering completed task

mainContainer.addEventListener('click',filterAction)
function filterAction(e) {
    if(e.target.id === 'complete') {
        let allItem  = document.querySelectorAll('li');
        allItem.forEach(item => {
            let hasAttr = item.hasAttribute('data-action')
            if(!hasAttr) {
                item.style.display = 'none';
            }
        })
    } else if (e.target.id === 'all') {
        let allItem  = document.querySelectorAll('li');
        allItem.forEach(item => {
            item.style.display = 'block'
        })
    } else if (e.target.id === 'active') {
        let allItem  = document.querySelectorAll('li');
        allItem.forEach(item => {
            let hasAttr = item.hasAttribute('data-action')
            if(hasAttr) {
                item.style.display = 'none';
            }
        })
    }
}


