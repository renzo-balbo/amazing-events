let cardContainer = document.getElementById("cardContainer");
let cardsData = eventsData.events;

cardsData.sort((firstCard, secondCard) => {     // ORDENA LOS EVENTOS POR FECHA
  if (firstCard.name > secondCard.name) {
    return 1;
  }
  if (firstCard.name < secondCard.name) {
    return -1;
  }
  return 0;
});

//---------------------------------------------
// FUNCIONES CREAR E IMPRIMIR CARDS
//---------------------------------------------
function crearTarjeta(event) {      // CREA CARDS POR LOS EVENTOS QUE SE LE PASEN COMO PARAMETRO
  let div = document.createElement("div");
  div.className = "card fondoVerde m-3";
  div.style.width = "18rem";
  div.innerHTML += `
      <img src="${event.image}" class="card-img-top" alt="foto_en_el_cine">
      <div class="card-body">
      <div class="card-description">
      <h5 class="card-title text-center">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      </div>
      <div class="d-flex justify-content-between align-items-center more-info">
      <p class="pt-3">Price $${event.price}</p>
      <a href="./details.html?id=${event._id}" class="btn btn-primary fondoRosa noBorder">More info</a>
      </div>
      </div>
      `;
  return div;
}

function imprimirTarjetas() {       // IMPRIME LAS CARDS CREADAS
  limpiarTarjetas();

  const events = cardsData.filter(filtrarPorCheckbox).filter(filtrarPorTexto);
  if (events.length != 0) {
    events.forEach((event) => {
      cardContainer.appendChild(crearTarjeta(event));
    });
  } else {
    noResults();
  }
}

function limpiarTarjetas() {        // LIMPIA TODOS LOS HIJOS DE cardContainer
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

function noResults() {      // CREA E IMPRIME UN MENSAJE DE NO RESULTS
  let div = document.createElement("div");
  div.innerHTML += `
      <h5> No results were found for "${searchTexts}". Try Again.</h5>`;
  cardContainer.appendChild(div);
}

//---------------------------------------------
// CHECKBOXES POR JS // CREA CHECKBOXES DE MANERA DINAMICA
//---------------------------------------------

let filterContainer = document.getElementById("filterContainer");      
let eventsCategories = [];      

cardsData.forEach((event) => {
  if (!eventsCategories.includes(event.category)) {
    eventsCategories.push(event.category);
  }
});

eventsCategories.forEach((category) => {
  let div = document.createElement("div");
  div.className = "d-flex align-items-center  m-1 me-lg-2 ms-lg-2";
  div.innerHTML += `
    <input class ="me-1" type="checkbox" value="${category}" id="${category}" name="${category}">
    <label for="${category}">${category}</label>
    `;
  filterContainer.appendChild(div);
});

//---------------------------------------------
// BARRA DE BUSQUEDA // UNA BARRA DE BUSQUEDA QUE GUARDA LA INFORMACION EN UNA VARIABLE
//---------------------------------------------

let searchFilterBar = document.forms[0];

let searchTexts = [];

searchFilterBar.addEventListener("submit", (text) => {
  text.preventDefault();
  searchTexts = searchFilterBar[9].value.split(" ");
  imprimirTarjetas();
});

//---------------------------------------------
// FUNCIONES DE FILTROS
//---------------------------------------------

let searchFilterBoxes = [];
let checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((box) => box.addEventListener("change", verificacion));

function verificacion() {
    let seleccionados = Array.from(checkboxes).filter(
      (checkboxes) => checkboxes.checked
    );
    searchFilterBoxes = [];
    seleccionados.forEach((checked) => {
      searchFilterBoxes.push(checked);
    });
  
    imprimirTarjetas();
  }


  function filtrarPorCheckbox(event) {
    let retVal = false;
    if (searchFilterBoxes.length == 0) {
      retVal = true;
    }
    searchFilterBoxes.forEach((check) => {
      if (event.category == check.value) {
        retVal = true;
      }
    });
  
    return retVal;
  }

  function filtrarPorTexto(event) {
    if (searchTexts.length != 0) {
      let retVal = false;
      searchTexts.forEach((word) => {
        if (event.description.toLowerCase().includes(word.toLowerCase())) {
          retVal = true;
        }
      });
      return retVal;
    }
    return true;
  }


//---------------------------------------------
//---------------------------------------------

imprimirTarjetas();