let listaPokemones = [];

const cargarPokemones = () => {
  let elListaPokemones = document.getElementById("listaPokemones");


  obtenerListaPokemones().then((pokemones) => {
    desactivarLoading();
    if (pokemones && pokemones.length) {
      listaPokemones = pokemones;
      pokemones.forEach((pokemon, index) => {
        obtenerPokemon(pokemon.name).then((pokemon)=>{
          console.log(pokemon);
        let div = document.createElement('div');
        div.classList = "col-md-3 col-sm-4";
        let card = document.createElement('div');
        card.classList = "card text-bg-dark mb-3";
        card.addEventListener("click", e => {
          // detallePokemon(pokemon);
        });

        card.innerHTML = `
                      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="">
                      <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                      </div>
                    `;

        div.appendChild(card);
        elListaPokemones.appendChild(div);
      })
      })
    }
  })
}

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