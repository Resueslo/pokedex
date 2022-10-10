
// ELEMENTOS
let elListaPokemones = document.getElementById("listaPokemones");
const inputBusqueda = document.getElementById("inputBusqueda");
let select = document.getElementById("comboTipos");

let listaPokemones = [];


activarLoading();

// BUSQUEDA
if (inputBusqueda) {
  inputBusqueda.addEventListener("keyup", () => {
    let textoBusqueda = inputBusqueda.value;
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

  pokemones.forEach((pokemon, index) => {
    obtenerPokemon(pokemon.name).then((pokemon) => {
      if (pokemon) {
        listaPokemones.push(pokemon);
        cargarPokemon(pokemon);
      }
    })

    if (index == pokemones.length - 1) {
      cargarTooltips();
    }
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
  let span = "";
  if (pokemon.types && pokemon.types.length) {
    pokemon.types.forEach((type, index) => {
      span += `<span class="icon-pokemon ${type.type.name} me-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="${type.type.name}"></span>`;

      if (index == pokemon.types.length - 1) {

        card.innerHTML = `
                  <img data-src="${pokemon.sprites.front_default}" class="lazyload card-img-top" width="100" alt="${pokemon.name}"></img>
                  <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                    ${span}
                  </div>
                `;

        div.appendChild(card);
        elListaPokemones.appendChild(div);
      }
    });
  }
};


const busquedaPokemon = busqueda => {
  activarLoading();
  // LIMPIAR LISTA
  elListaPokemones.innerHTML = "";

  let listaFiltrada;

  if(busqueda) {
    listaFiltrada = listaPokemones.filter(pokemon => pokemon.name.includes(busqueda));
  } else {
    listaFiltrada = listaPokemones;
  };

  if(!listaFiltrada.length) {
    desactivarLoading();
    return;
  };

  listaFiltrada.forEach((pokemon, index) => {
    if (pokemon.name.includes(busqueda)) {
      cargarPokemon(pokemon);
    }

    if(index == listaFiltrada.length-1) {
      cargarTooltips();
    }    
  });
};

const cargarComboTipos = () => {
  const regex = /(\d+)/g;

  obtenerListaTipos().then((tipos) => {
    if (tipos && tipos.length) {
      tipos.forEach(tipo => {
        if (tipo.name != 'unknown' && tipo.name != 'shadow') {
          let numeros = tipo.url.match(regex);
          let id = numeros[numeros.length - 1];

          let option = document.createElement('option');
          option.value = id;
          option.text = tipo.name;

          select.appendChild(option);
        }
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


const cargarTooltips = () => {
  setTimeout(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    desactivarLoading();
    lazyload();
  }, 1000);
}

cargarPokemones();
cargarComboTipos();