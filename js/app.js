`use strict`;

let table = document.getElementById('table');
let form = document.getElementById('form');
let clearStorage = document.getElementById('clearStorage');
let objArray = [];

function CreateMovie(movieName, image, release) {

    this.movieName = movieName;
    this.image = image;
    this.release = release;
    objArray.push(this);
}

form.addEventListener('submit', submitHandler);
function submitHandler(event) {

    event.preventDefault();
    let movieName = event.target.movieName.value;
    let image = event.target.image.value;
    let release = event.target.release.value;

    new CreateMovie(movieName, image, release);
    localStorage.data = JSON.stringify(objArray);

    clearTable();
    render();
}

getData();
render();

function render() {

    for (let i = 0; i < objArray.length; i++) {

        let trElement = document.createElement('tr');
        table.appendChild(trElement);

        let td1Element = document.createElement('td');
        trElement.appendChild(td1Element);
        td1Element.textContent = 'x'
        td1Element.id = i;

        let td2Element = document.createElement('td');
        trElement.appendChild(td2Element);
        let imgElemnt = document.createElement('img');
        td2Element.appendChild(imgElemnt);
        imgElemnt.src = './img/' + objArray[i].image.toLowerCase() + '.png';

        let td3Element = document.createElement('td');
        trElement.appendChild(td3Element);
        td3Element.textContent = objArray[i].movieName;

        let td4Element = document.createElement('td');
        trElement.appendChild(td4Element);
        td4Element.textContent = objArray[i].release;
    }
}

function clearTable() {

    let tableLength = table.rows.length;
    for (let i = 0; i < tableLength; i++) {
        table.deleteRow(0);
    }
}

function getData() {

    if (localStorage.data) {
        let data = JSON.parse(localStorage.data);
        for (let i = 0; i < data.length; i++) {
            new CreateMovie(data[i].movieName, data[i].image, data[i].release);
        }
    }
}

table.addEventListener('click', clearHandler);
function clearHandler(event) {
    if (event.target.id) {
        table.deleteRow(event.target.id);
        objArray.splice(event.target.id,1);
        localStorage.data=JSON.stringify(objArray);
        clearTable();
        render();
    }
}

clearStorage.addEventListener('click',clickHandler);
function clickHandler(){

    window.localStorage.removeItem('data');
    objArray = [];
    clearTable();
    render();
}
