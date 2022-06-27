let cardContainer = document.getElementById("cardContainer");
let cardsData = eventsData.events;
let filteredCardsData = cardsData.filter(
  (events) => events.date > eventsData.currentDate
);

filteredCardsData.sort((firstCard, secondCard) => {
    if (firstCard.name > secondCard.name) {
      return 1;
    }
    if (firstCard.name < secondCard.name) {
      return -1;
    }
    return 0;
  });
  
  function crearTarjeta(event) {
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
        <a href="./details.html" class="btn btn-primary fondoRosa noBorder">More info</a>
        </div>
        </div>
        `;
      return div;
    }
    
    //---------------------------------------------
    // BARRA DE BUSQUEDA Y FILTROS
    //---------------------------------------------
    
    //---------------------------------------------
    // CHECKBOXES POR JS
    //---------------------------------------------
    
    let filterContainer = document.getElementById("filterContainer");
    
    let eventsCategories = [];
    filteredCardsData.forEach((event) => {
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
    //---------------------------------------------
    
    let searchFilterBar = document.forms[0];
    
    let searchTexts = [];
    
    searchFilterBar.addEventListener("submit", (text) => {
      text.preventDefault();
      searchTexts = searchFilterBar[9].value.split(" ");
      imprimirTarjetas();
    });
    
    //---------------------------------------------
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
    
    function imprimirTarjetas() {
      limpiarTarjetas();
    
      const events = filteredCardsData.filter(filtrarPorCheckbox).filter(filtrarPorTexto);
      if (events.length != 0){
      events.forEach((event) => {
        cardContainer.appendChild(crearTarjeta(event));
      });} else {
        noResults()
      }
    }
    
    function limpiarTarjetas() {
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
    }
    
    function noResults(){
        let div = document.createElement('div')
        div.innerHTML += `
        <h5> No results were found. Try Again.</5>`
        cardContainer.appendChild(div);
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
          if (event.description.includes(word)) {
            retVal = true;
          }
        });
        return retVal;
      }
      return true;
    }
    
    imprimirTarjetas();
    
