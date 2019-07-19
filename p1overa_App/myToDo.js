const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');


let LIST = [];
let id = 0;
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

let data = localStorage.getItem("TODO");
//controllo se la list ha elementi al caricamento della pagina
if(data){
    LIST = JSON.parse(data);
    id = LIST.lenght; //serve a settare l'id come l'ultimo della lista, insomma, l'aggiunge in coda
    renderList(LIST); 
}else{
    LIST = [];
    id = 0;
}

function renderList(arr){
    arr.forEach(function (item){
        addToDO(item.name, item.id, item.done, item.trash)
    })
}

clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
})


function addToDO(toDo, id, done, trash) {

    //se è già nel trash la funzione deve ritornare per evitare che il codice giri a caso
    if (trash) { return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';

    const item = `<li class="item">
    <i class="fa ${DONE} complete" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o delete" job="delete" id="${id}"></i>
    </li>
    `
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
}

//attiva le proprietà sull'item
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        const toDo = input.value;
        if (toDo) {
            addToDO(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            id++;
            localStorage.setItem("TODO", JSON.stringify(LIST)); //metodo nativo per rowser: window.localStorage(). Per salvare gli elementi della lista. a differenza di sessionStorage, Local salva anche a chiusura pagina
        } //stringify trasforma qualsiasi elemento fli passiamo in una stringa sia esso una variabile o un oggetto
        input.value = "";
    }
});

//per checcare il todo

function toDoComplete(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//per rimuovere l'attività. ricorda che il tuo elemento ha due padri quindi sali di due livelli

function toDoRemoving(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//per beccare gli eventi e segnalare le funzioni di completamento o di rimozione

list.addEventListener('click', function (event) {
    const element = event.target;
    const elementjob = element.attributes.job.value;

    if (elementjob == 'complete') {
        toDoComplete(element);
    } else if (elementjob == 'delete') {
        toDoRemoving(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})