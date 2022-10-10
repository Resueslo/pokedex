const URL_API = "https://pokeapi.co/api/v2";
const URL_IMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world"

async function obtenerListaPokemones() {
    let url = `${URL_API}/pokemon/?offset=0&limit=500`;
    try {
        let response = await axios.get(url)
        console.log(response.data.results);
        return response.data.results
        
    } catch (e) {
        return []
    }
}


async function obtenerPokemon(id) {
    let url = `${URL_API}/pokemon/${id}`;
    try {
        let response = await axios.get(url);
        return response.data;
        
    } catch (e) {
        console.log("no espero");
        return []
    }
}

async function obtenerListaPokemonesPorTipo(tipoId) {
    let url = `${URL_API}/type/${tipoId}`;
    try {
        let response = await axios.get(url)
        return response.data
        
    } catch (e) {
        return []
    }
}


async function obtenerListaTipos() {
    let url = `${URL_API}/type/`;
    try {
        let response = await axios.get(url)
        return response.data.results
        
    } catch (e) {
        return []
    }
}

async function obtenerDatosPokemon(id) {
    let url = `${URL_API}/pokemon/${id}`;
    console.log(url);
    try {
        let response = await axios.get(url)
        console.log('123');
        console.log(response);
        return response
        
    } catch (e) {
        return []
    }
}
