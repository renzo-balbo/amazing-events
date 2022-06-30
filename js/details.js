const URI = 'http://amazing-events.herokuapp.com/api/events'
let cardsData = [];

function cargarDatos(URL){
    fetch(URL)
        .then (respuesta => respuesta.json())
            .then(data =>{
                let cardsData = data.events
                crearDetalles(encontrarEvento(cardsData))
            })
    }

cargarDatos(URI)


// VARIABLES
let main = document.getElementById("detailsBox");
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// FUNCIONES

function encontrarEvento(eventos){
  let selectedEvent = eventos.find((events) => events._id == id);
  console.log(selectedEvent)
  return selectedEvent
}

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
            <p class="col-12 text-center text-black">${event.assistance ? 'Assistance' : 'Estimate'}: ${event.assistance ? event.assistance : event.estimate}</p>
            <p class="col-12 text-center text-black">Price: $${event.price}</p>
    </div>
</div>
    `;
  main.appendChild(div);
}
