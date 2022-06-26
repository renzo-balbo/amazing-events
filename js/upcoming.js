let cardContainer = document.getElementById("cardContainer");
let cardsData = eventsData.events

cardsData.sort((firstCard, secondCard) => {
    if (firstCard.name > secondCard.name) {
        return 1
    }
    if (firstCard.name < secondCard.name) {
        return -1
    }
    return 0
})

let filteredCardsData = cardsData.filter(events => (events.date > eventsData.currentDate));

filteredCardsData.forEach(events => {
    let div = document.createElement('div');
    div.className = 'card fondoVerde m-3';
    div.style.width= '18rem';
    div.innerHTML += `
    <img src="${events.image}" class="card-img-top" alt="foto_en_el_cine">
    <div class="card-body">
    <div class="card-description">
    <h5 class="card-title text-center">${events.name}</h5>
    <p class="card-text">${events.description}</p>
    </div>
    <div class="d-flex justify-content-between align-items-center more-info">  
    <p class="pt-3">Price $${events.price}</p>
    <a href="./details.html" class="btn btn-primary fondoRosa noBorder">More info</a>
    </div>
    </div>
    `
cardContainer.appendChild(div);
});
