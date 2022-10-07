
// ELEMENTOS
let elListaPokemones = document.getElementById("listaPokemones");
const inputBusqueda = document.getElementById("inputBusqueda");
let select = document.getElementById("comboTipos");

let listaPokemones = [];

// BUSQUEDA
if (inputBusqueda) {
  inputBusqueda.addEventListener("keyup", () => {
    let textoBusqueda = inputBusqueda.value;

    if (!textoBusqueda) {
      console.log("Debe ingresar un nombre");
      cargarPokemones();
    }
    busquedaPokemon(textoBusqueda);
  })
}




const cargarPokemones = () => {
  activarLoading();
  obtenerListaPokemones().then((pokemones) => {
    if (pokemones && pokemones.length) {
      obtenerInfoPokemon(pokemones);
    }
  })
}

const cargarPokemonesPorTipo = tipoId => {
  activarLoading();
  obtenerListaPokemonesPorTipo(tipoId).then((pokemones) => {
    if (pokemones.pokemon && pokemones.pokemon.length) {
      let lista = pokemones.pokemon.map(pokemon => pokemon.pokemon);
      obtenerInfoPokemon(lista);
    }
  })
};

const obtenerInfoPokemon = pokemones => {  
  // LIMPIAR LISTA
  elListaPokemones.innerHTML = "";

  pokemones.forEach(pokemon => {
    obtenerPokemon(pokemon.name).then((pokemon) => {
      if (pokemon) {
        listaPokemones.push(pokemon);
        cargarPokemon(pokemon);
      }
    })
  })
};

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
  let totalTipos = 0;
  if (pokemon.types && pokemon.types.length) {
    totalTipos = pokemon.types.length;
    pokemon.types.forEach(type => {
      span += `<span class="badge rounded-pill text-bg-light me-2">${type.type.name}</span>`;
      contador++;
    });
  }

  if (contador == totalTipos) {
    card.innerHTML = `
              <img data-src="${pokemon.sprites.front_default}" class="lazyload card-img-top" width="100" alt="${pokemon.name}"></img>
              <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                ${span}
              </div>
            `;

    div.appendChild(card);
    elListaPokemones.appendChild(div);

    desactivarLoading();
    lazyload();
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

const cargarComboTipos = () => {
  const regex = /(\d+)/g;

  obtenerListaTipos().then((tipos) => {
    if (tipos && tipos.length) {
      tipos.forEach(tipo => {
        let numeros = tipo.url.match(regex);
        let id = numeros[numeros.length - 1];

        let option = document.createElement('option');
        option.value = id;
        option.text = tipo.name;

        select.appendChild(option);
      });
    }
  })
};

select.addEventListener("change", function () {
  inputBusqueda.value = "";
  if (this.value != '-1')
    cargarPokemonesPorTipo(this.value)
  else
    cargarPokemones();
})

setTimeout(() => {
  cargarPokemones();
}, 1000)

cargarComboTipos();