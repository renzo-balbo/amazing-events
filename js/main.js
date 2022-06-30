const URI = 'http://amazing-events.herokuapp.com/api/events'
let dataDeEventos = []

function cargarDatos(URL){
    fetch(URL)
        .then (respuesta => respuesta.json())
            .then(data =>{
                let eventos = data.events
                creacionDeCheckboxes(filtrarAlfabeticamente(eventos))
                impresionDeTarjetas(filtrarAlfabeticamente(eventos))
                dataDeEventos = filtrarAlfabeticamente(eventos)
            })
    }

cargarDatos(URI)

// VARIABLES

let barraDeBusqueda = document.getElementById('barraDeBusqueda');
let contenedorDeCheckboxes = document.getElementById('filterContainer');
let cardContainer = document.getElementById('cardContainer')

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
    let arrayFiltrado = arrayDeEventos.filter(evento => evento.name.toLowerCase().includes(texto.toLowerCase()))
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