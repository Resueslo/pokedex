let listaPokemones = [];

const cargarPokemones = () => {
  let elListaPokemones = document.getElementById("listaPokemones");


  obtenerListaPokemones().then((pokemones) => {
    desactivarLoading();
    if (pokemones && pokemones.length) {
      listaPokemones = pokemones;
      pokemones.forEach((pokemon, index) => {
        let div = document.createElement('div');
        div.classList = "col-md-3 col-sm-4";
        let card = document.createElement('div');
        card.classList = "card text-bg-dark mb-3";
        card.addEventListener("click", e => {
          window.location = `detalle.html?name=${pokemon.name}`;
        });

        card.innerHTML = `
                      <img src="./images/001.png" class="card-img-top" alt="">
                      <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                    `;

        div.appendChild(card);
        elListaPokemones.appendChild(div);
      })
    }
  })
}


setTimeout(() => {
  cargarPokemones();
}, 1000)