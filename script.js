let todoInput // tresc zadania
let errorInfo // info o braku zadan
let addBtn // dodaje nowe elementy do li
let ulList // lista zadan
let newToDo // nowe zadanie

// zmiienie do Popup
let popup
let popupInfo // tekts w popupie jak sie doda pusty tekts
let todoToEdit // edytowany todo
let poupInput // input w popupie 
let popupAddBtn // przcycisk "zatwierdz w popupie"
let popupCloseBtn // przycisk "anuluj" w popupie


// wywołwanie funkcji 
const main = () => {
    prepareDOMElements();
    prepareDOMEevents();
};

// pobieramy znaczniki 
const prepareDOMElements = () => {
todoInput = document.querySelector('.todo-input');
errorInfo = document.querySelector('.error-info');
addBtn = document.querySelector('.btn-add');
ulList = document.querySelector('.todolist');

//znaczniki popup
 popup = document.querySelector('.popup');
popupInfo = document.querySelector('.popup-info');
poupInput = document.querySelector('.popup-input');
popupAddBtn = document.querySelector('.accept');
popupCloseBtn = document.querySelector('.cancel');
};

// nasłuchiwanie wydarzen
const prepareDOMEevents = () => {
    addBtn.addEventListener('click',addNewToDo);
    ulList.addEventListener('click',checkClick);
    popupCloseBtn.addEventListener('click',closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    todoInput.addEventListener('keyup', enterKeyCheck);
};

const addNewToDo = () => {
   if(todoInput.value !== ''){
       newToDo = document.createElement('li');
       newToDo.innerHTML = todoInput.value;
       createToolsArea();
       
       ulList.append(newToDo);
      

       todoInput.value = '';
       errorInfo.innerHTML= '';
   }else{
    errorInfo.innerHTML = "Wpisz treść zadania!";
   }
};

// dodaje li i narzedzia
const createToolsArea = () => {

    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    newToDo.append(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    
    toolsPanel.append(completeBtn,editBtn,deleteBtn);
};

//sprawdza klikniecia w lisicie
const checkClick = e => {
    if(e.target.matches('.complete')){
        //przyisk copmplete
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    }else if(e.target.matches('.edit')){
        //przycisk edit
        editTodo(e);
    }else if(e.target.matches('.delete')){
        // przycisk delete
        deleteTodo(e);
    }
}

// otwiera popupa po klinieciu na "edit"
const editTodo = e => {
    todoToEdit = e.target.closest('li');
    poupInput.value = todoToEdit.firstChild.textContent;

    popup.style.display = 'flex';
}

// chowa popupa po klinieci na guzik "anuluj"
const closePopup = () => {
    popup.style.display = 'none';
}

// edytuje Inputa 
const changeTodoText = () => {
    if(popupInfo.value !== ''){
    todoToEdit.firstChild.textContent = poupInput.value;
    popup.style.display = 'none';
    popupInfo.textContent = '';
    }else {
        popupInfo.textContent = 'Musisz podac jakas tresc!'
    }
}


// usuwanie Inputa
const deleteTodo = e => {
 e.target.closest('li').remove();

 const allTodos = ulList.querySelectorAll('li');

 if(allTodos.length === 0 ){
    errorInfo.textContent = 'Brak zadań na liście.';
 }
}

const enterKeyCheck = e => {
    if(e.key==='Enter'){
        addNewToDo();
    }
}


//wywołanie głownej funkcji po załadowaniu strony
document.addEventListener('DOMContentLoaded',main);


