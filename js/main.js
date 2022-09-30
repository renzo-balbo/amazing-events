const URI = 'http://amazing-events.herokuapp.com/api/events'
let dataDeEventos = []

// VARIABLES

let barraDeBusqueda = document.getElementById('barraDeBusqueda');
let contenedorDeCheckboxes = document.getElementById('filterContainer');
let cardContainer = document.getElementById('cardContainer');

let index = document.getElementById('index');
let upcomingEvents = document.getElementById('upcomingEvents');
let pastEvents = document.getElementById('pastEvents');
let cajaDetalles = document.getElementById('detailsBox')

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (cardContainer) {
    barraDeBusqueda.addEventListener('keyup', ()=>{
    let primerFiltrado = filtrarPorInputDeTexto(dataDeEventos, barraDeBusqueda.value)
    let segundoFiltrado = filtrarPorCheckbox(primerFiltrado)
    impresionDeTarjetas(segundoFiltrado, cardContainer)
})

contenedorDeCheckboxes.addEventListener('change', () =>{
    let primerFiltrado = filtrarPorCheckbox(dataDeEventos)
    let segundoFiltrado = filtrarPorInputDeTexto(primerFiltrado, barraDeBusqueda.value)
    impresionDeTarjetas(segundoFiltrado, cardContainer);
})
}

// FUNCIONES
function filtrarAlfabeticamente(eventos){
    eventos.sort((firstCard, secondCard) => {
        if (firstCard.name > secondCard.name) {
        return 1;
        }
        else if (firstCard.name < secondCard.name) {
        return -1;
        }
        return 0;
    });
    return eventos
}

function filtrarPorCheckbox(arrayDeEventos){
    let arrayFiltrado = []
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayCheckboxes = Array.from(checkboxes)
    let arrayCheckboxesFiltrado = arrayCheckboxes.filter(checkbox => checkbox.checked)
    let arrayNombresDeCheckboxes = arrayCheckboxesFiltrado.map(checkbox => checkbox.value)
    arrayFiltrado = arrayDeEventos.filter(dataDeEventos => arrayNombresDeCheckboxes.includes(dataDeEventos.category))
    if(arrayFiltrado.length == 0){
        return arrayDeEventos
    } else {
        return arrayFiltrado
    }
}

function filtrarPorInputDeTexto(arrayDeEventos, texto){
    let arrayFiltrado = arrayDeEventos.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()) || evento.description.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function impresionDeTarjetas(arrayDeEventos){
    cardContainer.innerHTML=''
    if (arrayDeEventos.length == 0){
        let div = document.createElement("div");
        div.innerHTML += `
            <h5> No results were found. Try Again.</h5>`;
        cardContainer.appendChild(div);
    } else {
        arrayDeEventos.forEach(evento => {
            let div = document.createElement("div");
div.className = "card fondoVerde m-3";
div.style.width = "18rem";
div.innerHTML += `
    <img src="${evento.image}" class="card-img-top" alt="foto_en_el_cine">
    <div class="card-body">
    <div class="card-description">
    <h5 class="card-title text-center">${evento.name}</h5>
    <p class="card-text">${evento.description}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center more-info">
    <p class="pt-3">Price $${evento.price}</p>
    <a href="./details.html?id=${evento._id}" class="btn btn-primary fondoRosa noBorder">More info</a>
    </div>
    </div>
    `;
    cardContainer.appendChild(div)
        });
    }
}

function creacionDeCheckboxes(arrayDeEventos){
    let category = [];
    arrayDeEventos.forEach(evento =>{
        if (!category.includes(evento.category)){
            category.push(evento.category)
        }
    })
    category.forEach(category =>{
        let div = document.createElement("div");
        div.className = "d-flex align-items-center  m-1 me-lg-2 ms-lg-2";
        div.innerHTML += `
            <input class ="me-1" type="checkbox" value="${category}" id="${category}" name="${category}">
            <label for="${category}">${category}</label>
            `;
    contenedorDeCheckboxes.appendChild(div);
    })
}

function noResults(lugarDeImpresion){
    let div = document.createElement('div')
    div.innerHTML +=`<p>Sorry! We failed to load our data, please try again later or contact us for a quick response.</p>`
    lugarDeImpresion.appendChild(div)
}

function cargarDatos(URL){
    fetch(URL)
        .then (respuesta => respuesta.json())
            .then(data =>{
                let eventos = [];
                if (index){
                    eventos = data.events
                }
                if (upcomingEvents){
                    eventos = data.events.filter((evento)=> evento.date > data.currentDate)
                }
                if (pastEvents){
                    eventos = data.events.filter((evento)=> evento.date < data.currentDate)
                }
                let eventosOrdenados = filtrarAlfabeticamente(eventos)
                if (cardContainer){
                creacionDeCheckboxes(eventosOrdenados)
                impresionDeTarjetas(eventosOrdenados)
                dataDeEventos = eventosOrdenados
                }
                if (cajaDetalles){
                    eventos = data.events
                    let eventoSeleccionado = encontrarEvento(eventos)
                    crearDetalles(eventoSeleccionado, cajaDetalles)
                }
                if (tabla){
                    let futuros = data.events.filter((evento)=> evento.date > data.currentDate)
                    let pasados = data.events.filter((evento)=> evento.date < data.currentDate)
                    rellenarTabla(pasados)
                    crearRenglon(futuros, upcompingStats)
                    crearRenglon(pasados, pastStats)
                }
            })
        .catch(respuesta =>{
            if (cardContainer){
                noResults(cardContainer)
            }
            if (cajaDetalles){
                noResults(cajaDetalles)
            }
            if (tabla){
                noResults(tabla)
            }
        })
            
}

// Details
function encontrarEvento(eventos){
    let selectedEvent = eventos.find((events) => events._id == id);
    return selectedEvent
}

function crearDetalles(event, lugarDeImpresion) {
    let div = document.createElement("div");
    div.className =
    "d-flex flex-wrap col-9 p-3 fondoVerde detailsBox justify-content-evenly align-items-center";
    div.innerHTML = `
    <div class="col-12 col-md-6 d-flex justify-content-center">
    <img class="img-fluid col-10" src="${event.image}" alt="food_fair">
</div>

<div class="col-12 col-md-6">
    <div class="text-black d-flex flex-wrap justify-content-center">
        <h5 class="col-12 text-center">${event.name}</h5>
        <h6 class="col-12 rosa text-center">${event.date}</h6>
        <p class="col-12 text-center">${event.description}</p>
            <p class="col-12 text-center text-black">Category: ${event.category}</p>
            <p class="col-12 text-center text-black">Place: ${event.place}</p>
            <p class="col-12 text-center text-black">Capacity: ${event.capacity}</p>
            <p class="col-12 text-center text-black">${event.assistance ? 'Assistance' : 'Estimate'}: ${event.assistance ? event.assistance : event.estimate}</p>
            <p class="col-12 text-center text-black">Price: $${event.price}</p>
    </div>
</div>
    `;
    lugarDeImpresion.appendChild(div);
}

// Tabla
let tabla = document.getElementById('table');
let maximoGeneral = document.getElementById('maximoGeneral');
let minimoGeneral = document.getElementById('minimoGeneral');
let mayorCapacidad = document.getElementById('mayorCapacidad');
let upcompingStats = document.getElementById('upcomingStats');
let pastStats = document.getElementById('pastStats');

function rellenarTabla (eventos){
let capacidad = eventos.map(event => event.capacity)
let eventMaxCapacidad = eventos.find(event => event.capacity == Math.max(...capacidad))

let asistencia = eventos.map(event => event.assistance / event.capacity)
let eventMaxAsistencia = eventos.find(event => event.assistance / event.capacity == Math.max(...asistencia))
let eventMinAsistencia = eventos.find(event => event.assistance / event.capacity == Math.min(...asistencia))

maximoGeneral.innerText = `${eventMaxAsistencia.name}`
minimoGeneral.innerText = `${eventMinAsistencia.name}`
mayorCapacidad.innerText = `${eventMaxCapacidad.name}`
}

function crearRenglon(eventos, tbody){
    let listaDeCategorias = []
    eventos.forEach(evento =>{
        if (!listaDeCategorias.includes(evento.category)){
            listaDeCategorias.push(evento.category)
        }
    })
    listaDeCategorias.forEach(categoria =>{
        let estimados = []
        let capacidad = []
        let arrayDeGanancias = []

        eventos.forEach(evento =>{
            if (evento.category == categoria){
                estimados.push(evento.estimate? evento.estimate : evento.assistance)
                capacidad.push(evento.capacity)
                arrayDeGanancias.push(evento.price* Number(evento.estimate? evento.estimate : evento.assistance))
            }
        })
        let renglon = document.createElement('tr')
        renglon.innerHTML =`
        <td>${categoria}</td>
        <td>$${arrayDeGanancias.reduce((a, b) => a + b)}</td>
        <td>${Math.round((estimados.map(i=>Number(i)).reduce((a, b) => a + b))*100/(capacidad.map(i=>Number(i)).reduce((a, b) => a + b)))}%</td>
        `
        tbody.appendChild(renglon)
    })
}

//--------------------------------------------------------
cargarDatos(URI)