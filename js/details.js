let cardsData = eventsData.events;
let main = document.getElementById("detailsBox");

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = parseInt(params.get("id"));

const selectedEvent = cardsData.find((events) => events._id == id);

function crearDetalles(event) {
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
            <p class="col-12 text-center text-black">Assistance or estimate: ${event.assistance ? event.assistance : event.estimate}</p>
            <p class="col-12 text-center text-black">Price: $${event.price}</p>
    </div>
</div>
    `;
  main.appendChild(div);
}

crearDetalles(selectedEvent);
