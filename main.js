let checkAll = document.querySelector("input[name=checkAll]");
let checkButton = document.querySelector('label[for="checkAll"]');

let newTodo = document.querySelector('#new-todo');
let todoList = document.querySelector('#todoList');

let foot = document.querySelector('.footer');
let todoCount = document.querySelector('#todo-count');
let allBtn = document.querySelector('#allBtn');
let activeBtn = document.querySelector('#activeBtn');
let completedBtn = document.querySelector('#completedBtn');



checkAll.addEventListener('change', function () {
    let todoListItems = document.querySelectorAll('#todoList li');

    if (checkAll.checked) {
        checkButton.style.opacity = 1;

        for (let i = 0; i < todoListItems.length; i++) {
            const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
            checkbox.checked = true;
            // 
            ChangeCheckStyle(todoListItems[i], checkAll.checked)
            // 
        }
    }
    else {
        checkButton.style.opacity = 0.5;

        for (let i = 0; i < todoListItems.length; i++) {
            const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
            checkbox.checked = false;
            // 
            ChangeCheckStyle(todoListItems[i], checkAll.checked)
            // 
        }
    }
    Counter();


}
);

newTodo.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (newTodo.value != "") {
            const li = document.createElement('li');

            const div = document.createElement('div');
            div.classList.add('item');

            const titleInput = document.createElement('input');
            titleInput.classList.add('toggle');
            titleInput.type = 'checkbox'

            const label = document.createElement('label');
            label.textContent = newTodo.value;

            const button = document.createElement('button');
            button.classList.add('remove');
            button.textContent = '❌';

            div.appendChild(titleInput);
            div.appendChild(label);
            div.appendChild(button);

            li.appendChild(div);

            todoList.appendChild(li);
            newTodo.value = "";

            // 

            titleInput.addEventListener('change', function () {
                ChangeCheckStyle(titleInput, titleInput.checked)
            });

            // 

            button.addEventListener("click", function () {
                li.remove();

                hideFooter();
            })
            Counter();
        }

        if (todoList.children.length > 0) {
            checkButton.style.display = "block";
            foot.style.display = "flex";
        }
    }
});


function Counter() {
    let todoListItems = document.querySelectorAll('#todoList li');
    let todoCounter = 0;
    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            todoCounter++;
        }
    }
    todoCount.textContent = todoCounter + ' items left'
}

window.addEventListener("click", function () {
    Counter();
    LoopCheckboxes();
    CheckIfChecked();

    if(allBtn.classList.contains('selected')){
        ChangeToAll();
    }
    else if(activeBtn.classList.contains('selected')){
        ChangeToActive();
    }
    else{
        ChangeToCompleted();
    }

});


let clear = document.querySelector('.clear-completed');
clear.addEventListener('click', function () {

    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            todoListItems[i].remove();
        }
    }
    CheckIfChecked();
    hideFooter();
})

function hideFooter() {
    if (todoList.children.length > 0) {
        checkButton.style.display = "block";
        foot.style.display = "flex";
    }
    else {
        checkButton.style.display = "none"
        foot.style.display = "none";
    }
}


function ChangeCheckStyle(listItem, isChecked) {
    if (isChecked) {
        listItem.classList.add('completed');
    }
    else {
        listItem.classList.remove('completed');
    }
}

function LoopCheckboxes() {
    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        ChangeCheckStyle(todoListItems[i], checkbox.checked);

    }
}

allBtn.onclick = function () {
    ChangeToAll();
}

function ChangeToAll() {
    allBtn.classList.add('selected');
    activeBtn.classList.remove('selected');
    completedBtn.classList.remove('selected');


    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        todoListItems[i].classList.remove('hide');
    }
}


activeBtn.onclick = function () {
    ChangeToAll();
    ChangeToActive();
};

function ChangeToActive() {
    allBtn.classList.remove('selected');
    activeBtn.classList.add('selected');
    completedBtn.classList.remove('selected');


    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            todoListItems[i].classList.add('hide');
        }
    }
}


completedBtn.onclick = function () {
    ChangeToAll();
    ChangeToCompleted();
};

function ChangeToCompleted() {
    allBtn.classList.remove('selected');
    activeBtn.classList.remove('selected');
    completedBtn.classList.add('selected');


    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            todoListItems[i].classList.add('hide');
        }
    }
}


function CheckIfChecked(){
    let todoListItems = document.querySelectorAll('#todoList li');

    for (let i = 0; i < todoListItems.length; i++) {
        const checkbox = todoListItems[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            clear.classList.remove('hidden');
        }
        else{
            clear.classList.add('hidden')
        }
        break;
    }
}




