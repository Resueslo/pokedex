
// ELEMENTOS
let elListaPokemones = document.getElementById("listaPokemones");
const inputBusqueda = document.getElementById("inputBusqueda");

let listaPokemones = [];

// BUSQUEDA
if (inputBusqueda) {
  inputBusqueda.addEventListener("keyup", () => {
    let textoBusqueda = inputBusqueda.value;

    if (!textoBusqueda) {
      console.log("Debe ingresar un nombre");
      return;
    }
    busquedaPokemon(textoBusqueda);
  })
}




const cargarPokemones = () => {
  obtenerListaPokemones().then((pokemones) => {
    desactivarLoading();
    if (pokemones && pokemones.length) {
      pokemones.forEach(pokemon => {
        obtenerPokemon(pokemon.name).then((pokemon) => {
          listaPokemones.push(pokemon);
          console.log(pokemon);
          cargarPokemon(pokemon);
        })
      })
    }
  })
}

const cargarPokemon = pokemon => {
  let div = document.createElement('div');
  div.classList = "col-md-3 col-sm-4";
  let card = document.createElement('div');
  card.classList = "card text-bg-dark mb-3";
  card.addEventListener("click", e => {
    window.location = `detalle.html?name=${pokemon.name}`;
  });

  // TIPOS DEL POKEMON
  let contador = 0;
  let span = "";
  if (pokemon.types && pokemon.types.length) {
    pokemon.types.forEach(type => {
      span += `<span class="badge rounded-pill text-bg-light me-2">${type.type.name}</span>`;
      contador++;
    });
  }  

  if (contador == pokemon.types.length) {
    card.innerHTML = `
              <img src="${pokemon.sprites.front_default}" class="lazyload card-img-top" alt="${pokemon.name}"></img>
              <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                ${span}
              </div>
            `;

    div.appendChild(card);
    elListaPokemones.appendChild(div);
  }
};

const busquedaPokemon = busqueda => {
  // LIMPIAR LISTA
  elListaPokemones.innerHTML = "";

  listaPokemones.forEach(pokemon => {
    if (pokemon.name.includes(busqueda)) {
      cargarPokemon(pokemon);
    }
  });

};



document.addEventListener("DOMContentLoaded", function (event) {

});


// function detallePokemon(data){

//   let modal = document.createElement('div');
//   modal.setAttribute('id','modal');
//   modal.setAttribute('class','modal');
//   let card = document.createElement('div');
//   card.classList("modal-content")
//   card.innerHTML = `
//                       <img src="${data.sprites.front_default}" class="card-img-top" alt="">
//                       <div class="card-body">
//                         <h5 class="card-title">${data.name}</h5>
//                       </div>
//                     `;

//   modal.appendChild(card);
//   console.log(card);
//   $('#modal').modal('show');
// }




setTimeout(() => {
  cargarPokemones();
}, 1000)