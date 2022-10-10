
init = () => {
    //obtener parametros
    const urlParams = new URLSearchParams(window.location.search);
    idPokemon = urlParams.get('name');
    tipo = urlParams.get('type');

    obtenerDetallePokemon(idPokemon);
}
async function obtenerDetallePokemon(id) {
    let Abilities = document.getElementById("Abilities");
    let moves = document.getElementById("moves");
    let stat = document.getElementById("stat");
    let namPokemon = document.getElementById("namPokemon");
    let concatenarDosMoves = '';
    let concatenarDos = '';
    let concatenarStat = '';
    let concatenarTres = '';
    let concatenar = '';

    await obtenerDatosPokemon(id).then(async(pokemon) => {
         let data = pokemon['data'];
         let contador = 1;
         let concatenarDos = '';

         data.abilities.forEach(element => {
           if (contador ==1){

            concatenar = (element.ability.name);
            
           } else {
            concatenarDos = ','+(element.ability.name);
           }
           concatenar = concatenar+' '+concatenarDos;

           contador++;  
            
         });

         data.moves.forEach(mov => {

            concatenarDos =  (mov.move.name);
            concatenarDosMoves = concatenarDosMoves+' '+concatenarDos+',';

        });

        data.stats.forEach(element => {

            concatenarTres = (element.stat.name);
            concatenarStat = concatenarStat+' '+concatenarTres+',';
            
         });

    })

    concatenar = concatenar.substring(0, concatenar.length - 1);
    concatenarDosMoves = concatenarDosMoves.substring(0, concatenarDosMoves.length - 1);
    concatenarStat = concatenarStat.substring(0, concatenarStat.length - 1);

    Abilities.innerText = concatenar+'.';
    moves.innerText = concatenarDosMoves+'.';
    stat.innerText = concatenarStat+'.';
    namPokemon.innerText = id+'.';
}

init();