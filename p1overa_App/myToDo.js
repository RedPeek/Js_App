const clear = document.querySelector('.clear');
const list = document.getElementById('list');
const input = document.getElementById('input');


let LIST = [];
let id = 0;
let element;

const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';


function addToDO(toDo, id, done, trash) {

    //se è già nel trash la funzione deve ritornare per evitare che il codice giri a caso
    if (trash) {
        return;
    }

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

//controlla se il value è vivo
document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        const toDo = input.value;
        if (toDo) {
            addToDO(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        }
        input.value = "";
    }
});

//per checcare il todo

function toDoComplete(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? true : false;
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
})


clear.addEventListener('click', function (event) {
    if (event) {
        document.querySelector('.item').innerHTML = ``;
        LIST = [];
    }
})