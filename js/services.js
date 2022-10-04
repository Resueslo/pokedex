const URL_API = "https://pokeapi.co/api/v2";

async function obtenerListaPokemones() {
    let url = `${URL_API}/pokemon`;

    try {
        let response = await axios.get(url);
        return response.data.results
    } catch (e) {
        return []
    }
}